<div align="center">

# Recipe Island

React application exercise for browsing and exploring recipes from an API endpoint. Built with React 19, Vite, and Bootstrap.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Site-brightgreen?style=for-the-badge)](https://de-coil.github.io/recipeees/)

![Cookies](public/favicon.png)

</div>

## Features

- Browse 50+ recipes from various cuisines
- View detailed recipe information including ingredients, instructions, and nutritional data
- Filter and search capabilities
- Responsive design with orange theme
- Fast page loads with Vite's hot module replacement

## Technologies

- **React 19** - UI library
- **Vite 8** - Build tool and dev server
- **React Router 8** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - UI framework
- **Oxlint** - Linting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Ricettario
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Start the development server
```bash
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── assets/          # Images and static assets
├── routes/          # Page components
│   ├── Recipes.jsx      # Recipe list page
│   └── RecipeDetails.jsx # Recipe detail page
├── App.jsx          # Main app component
├── App.css          # App styles
├── main.jsx         # App entry point
├── index.css        # Global styles (orange theme)
└── index.css        # CSS variables and theme
```

## API

This project uses the [DummyJSON Recipes API](https://dummyjson.com/recipes) for recipe data.

### Available Endpoints

- `GET /recipes` - List all recipes
- `GET /recipes/:id` - Get recipe details

## Features in Detail

### Recipe List
- Displays recipes in a responsive table
- Shows cuisine type, difficulty level, and total cooking time
- Difficulty badges with color coding (Easy/Medium/Hard)

### Recipe Details
- Full recipe information
- Ingredients list
- Step-by-step instructions
- Nutritional information (calories per serving)
- Cooking and prep time
- User ratings and reviews
- Meal type and tags

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run Oxlint

## License

[MIT](LICENSE)
