#!/bin/bash
# Obtener la última etiqueta usando 'git tag --list'
git fetch --tags
TAG=$(git tag --list 'v*' --sort=-v:refname | head -n 1)

# Si no hay ningún tag, usar un tag predeterminado 'v0.0.0'
if [ -z "$TAG" ]; then
  echo "No tags found, setting default tag to v0.0.0"
  TAG="v0.0.0"
fi

echo "Current tag is: $TAG"

# Detectar la rama actual
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch is: $BRANCH"

# Verificar si la rama es 'develop', 'qa', o 'prod'
if [ "$BRANCH" = "develop" ]; then
  SUFFIX="-dev"
elif [ "$BRANCH" = "qa" ]; then
  SUFFIX="-qa"
elif [ "$BRANCH" = "prod" ]; then
  SUFFIX="-prod"
else
  SUFFIX="-dev"
fi

# Dividir el tag actual en MAJOR, MINOR, y PATCH
VERSION=$(echo $TAG | cut -d'-' -f1)
VERSION_NUM=$(echo $VERSION | sed 's/v//')
MAJOR=$(echo $VERSION_NUM | cut -d'.' -f1)
MINOR=$(echo $VERSION_NUM | cut -d'.' -f2)
PATCH=$(echo $VERSION_NUM | cut -d'.' -f3)

# Verificar que MAJOR, MINOR, y PATCH no estén vacíos
if [ -z "$MAJOR" ] || [ -z "$MINOR" ] || [ -z "$PATCH" ]; then
  echo "Error: Unable to parse version number from tag $TAG"
  exit 1
fi

PATCH=$((PATCH + 1))

# Manejo de versiones: incrementar MINOR y MAJOR si es necesario
if [ "$PATCH" -ge 10 ]; then
  PATCH=0
  MINOR=$((MINOR + 1))
fi

if [ "$MINOR" -ge 10 ]; then
  MINOR=0
  MAJOR=$((MAJOR + 1))
fi

# Crear nuevo tag basado en la rama actual
NEW_TAG="v${MAJOR}.${MINOR}.${PATCH}${SUFFIX}"
echo "New tag will be: $NEW_TAG"

# Verificar si la etiqueta ya existe
if git rev-parse "$NEW_TAG" >/dev/null 2>&1; then
  echo "Tag $NEW_TAG already exists. No need to create it again."
else
  echo "Creating new tag $NEW_TAG"
  sudo git tag ${NEW_TAG}
  sudo git push origin ${NEW_TAG}
fi