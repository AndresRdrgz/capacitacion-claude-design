# Handoff a Claude Code — Sprint 4: Pulido + reviews + wishlist

> **Para**: Claude Code
> **Working dir**: `/Users/andresrodriguez/Documents/GitHub/iAcademy`
> **Branch base**: `main` (con sprints 1, 2, 3 mergeados)
> **Branch de trabajo**: `feat/claude-mvp-pulido` (o dos branches: `feat/claude-mvp-reviews` y `feat/claude-mvp-pulido`)
> **PR title**: `feat(plataforma+frontend): course reviews CRUD + wishlist + a11y pass for Claude MVP`
> **Sprint plan**: `.plan/sprints/sprint-4-pulido.md`
> **Depende de**: Sprint 1 + 2 + 3 mergeados

---

## Pre-flight

```bash
cd /Users/andresrodriguez/Documents/GitHub/iAcademy
git checkout main
git pull
git checkout -b feat/claude-mvp-pulido
```

Lee:
1. `.plan/sprints/sprint-4-pulido.md` (este sprint)
2. `frontend-plataforma/AGENTS.md`
3. `backend/AGENTS.md`
4. `iAcademy/CLAUDE.md` y los CLAUDE.md por subdirectorio

---

## Tarea exacta

Llevar el MVP a estado pulido y probado. Backend: reviews CRUD + wishlist endpoints. Frontend: componentes, accesibilidad, empty states. Testing con usuarios reales (coordinar con Andrés).

### Parte A — Backend (`backend/plataforma/`)

#### A1. `CourseReviewViewSet` completo

**Archivo**: `views.py`

```python
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import CourseReview, OnlineCourse, LearnerProfile
from .serializers import CourseReviewSerializer
from .permissions import IsEnrolledInCourse, IsReviewAuthor


class CourseReviewViewSet(viewsets.ModelViewSet):
    serializer_class = CourseReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        course_slug = self.kwargs.get('course_slug') or self.request.query_params.get('course_slug')
        qs = CourseReview.objects.select_related('learner__estudiante', 'course')
        if course_slug:
            qs = qs.filter(course__slug=course_slug)
        return qs.order_by('-created_at')
    
    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsReviewAuthor()]
        if self.action == 'create':
            return [permissions.IsAuthenticated(), IsEnrolledInCourse()]
        return [permissions.IsAuthenticated()]
    
    def perform_create(self, serializer):
        course_slug = self.kwargs.get('course_slug')
        course = get_object_or_404(OnlineCourse, slug=course_slug)
        learner = self.request.user.learner_profile
        # Auto-marcar como verificada si completó
        is_completed = course.enrollments.filter(
            learner=learner,
            status='completed',
        ).exists()
        serializer.save(course=course, learner=learner, is_verified_completion=is_completed)


class WishlistViewSet(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return self.request.user.learner_profile.wishlist.select_related('course')
    
    def list(self, request):
        items = self.get_queryset()
        return Response(WishlistSerializer(items, many=True).data)
    
    def create(self, request):
        course_id = request.data.get('course_id')
        course = get_object_or_404(OnlineCourse, id=course_id)
        wishlist_item, created = Wishlist.objects.get_or_create(
            learner=request.user.learner_profile,
            course=course,
        )
        return Response(
            WishlistSerializer(wishlist_item).data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )
    
    def destroy(self, request, course_id=None):
        deleted, _ = Wishlist.objects.filter(
            learner=request.user.learner_profile,
            course_id=course_id,
        ).delete()
        if deleted:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Not in wishlist'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'], url_path='ids')
    def ids(self, request):
        ids = list(self.get_queryset().values_list('course_id', flat=True))
        return Response({'wishlist_ids': ids})
```

#### A2. Permisos custom

**Archivo**: `permissions.py` (nuevo o agregar al existente)

```python
from rest_framework import permissions
from .models import CourseReview


class IsEnrolledInCourse(permissions.BasePermission):
    """El usuario está matriculado en el curso que intenta reseñar."""
    message = "Debes estar matriculado en este curso para reseñarlo."
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        course_slug = view.kwargs.get('course_slug')
        if not course_slug:
            return True
        try:
            learner = request.user.learner_profile
            return learner.enrollments.filter(course__slug=course_slug).exists()
        except AttributeError:
            return False


class IsReviewAuthor(permissions.BasePermission):
    """El usuario es el autor de la reseña (o admin)."""
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        return obj.learner.user == request.user
```

#### A3. Tests

**Archivo**: `tests.py` (extender)

```python
class CourseReviewTestCase(TestCase):
    def setUp(self):
        # crear user, learner_profile, course, enrollment
        ...
    
    def test_create_review_requires_auth(self):
        # sin auth → 401
    
    def test_create_review_requires_enrollment(self):
        # autenticado pero no matriculado → 403
    
    def test_create_review_success(self):
        # autenticado + matriculado → 201, review creada
    
    def test_create_duplicate_review_fails(self):
        # segunda review del mismo learner → 400
    
    def test_update_only_author(self):
        # otro user no puede editar → 403
    
    def test_rating_validation(self):
        # rating=0 y rating=6 → 400


class WishlistTestCase(TestCase):
    def test_add_to_wishlist(self):
        ...
    
    def test_remove_from_wishlist(self):
        ...
    
    def test_unique(self):
        ...
    
    def test_ids_endpoint(self):
        ...
```

#### A4. URLs

**Archivo**: `urls.py`

```python
# Ya está en sprint 1, pero verificar que el admin router incluye:
admin_router.register(r'course-reviews', views.CourseReviewViewSet, basename='admin-course-review')

# Y los paths públicos (no admin):
path('courses/<slug:slug>/reviews/', 
     views.CourseReviewViewSet.as_view({'get': 'list', 'post': 'create'}),
     name='course-reviews'),
path('courses/<slug:slug>/reviews/<int:pk>/', 
     views.CourseReviewViewSet.as_view({'patch': 'partial_update', 'delete': 'destroy'}),
     name='course-review-detail'),
path('me/wishlist/', 
     views.WishlistViewSet.as_view({'get': 'list', 'post': 'create'}),
     name='my-wishlist'),
path('me/wishlist/<int:course_id>/', 
     views.WishlistViewSet.as_view({'delete': 'destroy'}),
     name='my-wishlist-delete'),
path('me/wishlist/ids/', 
     views.WishlistViewSet.as_view({'get': 'ids'}),
     name='my-wishlist-ids'),
```

### Parte B — Frontend (`frontend-plataforma/`)

#### B1. Componentes nuevos

```
src/components/curso/
├── course-reviews.tsx       # Lista + form
├── review-form.tsx          # Form con 1-5 estrellas
└── wishlist-button.tsx      # Botón bookmark

src/components/ui/
├── star-rating.tsx          # Reutilizable
└── empty-state.tsx          # Reutilizable
```

#### B2. `StarRating` component

```typescript
"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  ariaLabel?: string
}

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = 'md',
  className,
  ariaLabel = 'Calificación',
}: StarRatingProps) {
  const [hover, setHover] = useState(0)
  const display = hover || value
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }
  
  return (
    <div
      role={readonly ? 'img' : 'radiogroup'}
      aria-label={`${ariaLabel}: ${value} de 5 estrellas`}
      className={cn("flex items-center gap-1", className)}
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => !readonly && setHover(n)}
          aria-label={`${n} ${n === 1 ? 'estrella' : 'estrellas'}`}
          aria-pressed={value === n}
          className={cn(
            "transition-colors",
            !readonly && "hover:scale-110 cursor-pointer",
            readonly && "cursor-default"
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              display >= n ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  )
}
```

#### B3. `EmptyState` component

```typescript
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-12 rounded-lg border border-dashed",
      className
    )}>
      <Icon className="h-12 w-12 text-muted-foreground mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-4 max-w-md">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm font-medium text-primary hover:underline"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
```

#### B4. `ReviewForm` component

Form con:
- StarRating editable
- Input título (opcional)
- Textarea comentario
- Botón submit
- Toast de éxito/error
- Loading state

Llamar a `createCourseReview(slug, data)` del API client.

#### B5. `CourseReviews` component

- Fetch `getCourseReviews(slug)` en mount
- Mostrar promedio de rating
- Lista de reviews con avatar, nombre, fecha, rating, comentario
- Si el usuario puede reseñar (completó el curso), mostrar form
- Filtros: "Más recientes" | "Mejor valoradas"
- Empty state

#### B6. `WishlistButton` component

- Recibe `courseId` y `initialWishlisted`
- Llama al API
- Toast feedback
- Estado visual (icono lleno vs vacío)

### Parte C — Accesibilidad

1. Correr Lighthouse en Chrome DevTools en cada página nueva
2. Score > 95
3. Verificar:
   - Contraste
   - Focus states
   - ARIA labels
   - Keyboard navigation
   - Headings jerárquicos
   - Alt text

### Parte D — Testing con usuarios reales

**Esto NO lo hace Claude Code. Esto lo coordina Andrés.**

Después de mergear el código:
1. Andrés recluta 3-5 estudiantes
2. Andrés les da acceso al curso
3. Sesión de 30 min de feedback
4. Documentar bugs en issues
5. Resolver bugs críticos en otro PR

## Restricciones

1. NO agregues dependencias a `package.json` ni `requirements.txt`
2. NO rompas el flujo existente de comentarios en grabaciones
3. NO crees componentes duplicados de los que ya existen — verifica primero
4. Mantén el estilo del código (TS strict, shadcn/ui, Tailwind, español)
5. NO agregues analytics todavía

## Verificación

```bash
# Backend
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/backend
source venv/bin/activate
python manage.py test plataforma -v 2
# Todos los tests pasan

# Frontend
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/frontend-plataforma
npm run build
npm run lint

# Manual end-to-end
# 1. Login como estudiante que YA completó el curso
# 2. /curso/curso-de-claude-code → tab Reseñas → form visible
# 3. Dejar reseña de 5★
# 4. Aparece en la lista
# 5. Login como otro estudiante → ve la reseña pero NO el form
# 6. Click wishlist → toast éxito
# 7. Lighthouse → Accessibility > 95
```

## Output esperado

Reporta:
1. `git diff --stat` de todos los cambios
2. Output de tests
3. Output de `npm run build` y `npm run lint`
4. Lighthouse score por página
5. Lista de desviaciones

NO commit. NO push. NO PR.
