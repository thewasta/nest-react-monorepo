# Get Started

1. Install [pnpm](https://pnpm.io/installation)
2. Install dependencies
   1. In root path, run `pnpm install`
3. Run project
   1. In root path, run `pnpm run dev`

If you prefer to use **npm** or **yarn**, you have to add to `package.json`, the key `workspace`
```json
{
  "workspaces": [
    "apps/*"
  ]
}
```
For more docs, visit [turbo.build](https://turbo.build/repo/docs/handbook/workspaces)

# Usage
The source code is on folder `/apps` this contains two folder `api`,`client`

### API Folder
This is a NestJS application to serve backend.

### Client Folder
This is a Vite application to serve fronted.