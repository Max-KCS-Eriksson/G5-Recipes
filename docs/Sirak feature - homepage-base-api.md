## Först gjorde jag detta:
# Sirak-1: feature/homepage-base-ui

### Ändringar / Basic Project Setup
1. Alla src-mappar har skapats (tomma).
2. Filer har skapats i mapparna: /pages, /components, /api.
3. React Router Dom (v7.9.3) installerat.
4. App.jsx har nu grundläggande Routing.
5. HomePage.jsx + RecipeCard.jsx provkörning via dummy-data (fake data) innan "riktig" API-Data - lyckat.![lyckad](feature_homepage-base-ui_done.png)
6. Skapade 'feature/homepage-base-api' utifrån denna branch.


## .. och sen gjorde jag detta: 
# Sirak-2. feature/homepage-base-api


## 1. Startsida (HomePage.jsx)

---

## 2. API

### API-Filer skapade: 
- api_recipes.js (2 metoder).
- api_categories.js (2 metoder).
- api_config.js (BASE_URL-konstanten).


### API & Env - Flow
.env → VITE_API_URL
          ↓
Vite kompilering (import.meta.env.VITE_API_URL)
          ↓
api_config.js : exporterar BASE_URL
          ↓
api_recipes.js, api_categories.js, ..., : importerar BASE_URL

### Implementerade API-Anslutningar
|  #  | API-åtgärd                        | Endpoint                                 | Implementerad i fil                                    | Status (kod)          | Kommentar                                           |
| :-: | :-------------------------------- | :--------------------------------------- | :----------------------------------------------------- | :-------------------- | :-------------------------------------------------- |
|  1  | **List all recipes**              | `GET /recipes`                           | `src/api/api_recipes.js` → `getAllRecipes()`           | ✅ Fullt implementerad | Används av `HomePage.jsx` vid initial hämtning      |
|  2  | **List all categories**           | `GET /categories`                        | `src/api/api_categories.js` → `getAllCategories()`     | ✅ Fullt implementerad | Hämtar kategorilista i HomePage.jsx                 |
|  3  | **List all recipes by category**  | `GET /categories/{categoryName}/recipes` | `src/api/api_categories.js` → `getRecipesByCategory()` | ✅ Fullt implementerad | Kallas i `handleCategoryClick()` i HomePage.jsx     |

### API - Misc Info
- BASE_URL = Alla API-anrop använder denna konstant som grund-address
- import.meta.env.VITE_API_URL = Värde för att hämta miljövariabel från .env-filen

---

## 3. CSS (App.css)

/* 0. GLOBAL */
/* 1. SEARCH */
/* 2. CATEGORIES */
/* 3. RECIPES */
/*    MISC. (annat) */


---

## Sammanfattning: Relevanta Mappar och Filer

G5-Recipes/
├── .env
├── src/
│   ├── api/
│   │   ├── api_categories.js
│   │   ├── api_config.js
│   │   ├── api_recipes.js
│   ├── components/
│   │   ├── CategoryList.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── SearchBar.jsx
│   ├── pages/
│   │   ├── HomePage.jsx









