# 🛠️ ResourceManager — TypeScript Backend Toolkit

**Solo-developed modular resource management backend, crafted for scalable web applications.**

---

## 🎯 Overview

ResourceManager is a **TypeScript-first backend toolkit** for structured resource management—built solo to explore robust, maintainable architectures for web APIs and services.  
Not tied to a specific framework, it demonstrates clean design, reusability, and modular implementations of typical backend patterns:  
CRUD logic, role/permission layers, request handling, and data validation.

Built to push my skills, this project deepened my understanding of scalable codebases and system modularity—especially relevant to modern SaaS, admin panels, and cloud APIs.

---

## 🧠 Architecture Diagram

ResourceManager  
├── ResourceController  
│   ├── Handles HTTP requests  
│   └── Delegates business logic  
├── ResourceService  
│   ├── CRUD operations  
│   └── Rules & validation  
├── ResourceModel  
│   └── Data schema & TypeScript types  
├── Middleware  
│   ├── Auth/permission checks  
│   └── Validation and error handling  
└── Utility  
    ├── Logger  
    └── Helper functions

---

## ⚙️ Main Systems

### 📦 Resource Management Core
- `ResourceController`: Accepts and processes external requests (REST or similar).
- `ResourceService`: Encapsulates all business/resource logic (CRUD, filtering, bulk actions).
- `ResourceModel`: Centralizes data schema and TS typing for safe, predictable data usage.

### 🛡️ Middleware & Permissions
- Modular middleware for authentication and permission control.
- Validation layer to ensure resource integrity on every write.
- Unified error catcher for concise error reporting.

### 🪓 Utility Suite
- Lightweight logger for development/tracing.
- Helper utilities (ID generation, deep cloning, pagination helpers).

---

## 🛠️ Example Flow

1. **Client** sends a request → `ResourceController` receives input
2. Controller validates payload and permissions via middleware
3. Passes sanitized data to `ResourceService`
4. Service executes operation (e.g., creates or updates a resource)
5. Service relies on `ResourceModel` for correct data shapes/types
6. Controller returns response to client (success or handled error)

---

## 🔍 Design Philosophy

- **Modular:** Each piece (controllers, services, models, middleware) is decoupled for maximum flexibility and testability.
- **Type-Safe:** Heavy use of TypeScript ensures reliability and IDE support throughout.
- **Framework-Agnostic:** Core logic stays independent of any Node.js framework.
- **Extensible:** Easy to add more resources or permission layers without codebase rewrites.

---

## 📦 Tech & Tools

- **TypeScript** (primary language)
- **JavaScript** (utility/interoperability)
- **Node.js** runtime (or compatible)
- **CSS** for any optional admin UI stubs

> ⚠️ This repo demonstrates backend code structure—no frontend or database binding included.
> Meant as a *developer learning resource* for scalable resource management, not a production-ready template.

---

## 🗂️ Example Code Snippets

```typescript
// Example: Type-safe Resource Service method
export class ResourceService<T> {
  constructor(private model: ResourceModel<T>) {}

  async create(data: T): Promise<T> {
    this.model.validate(data)
    const resource = await this.model.save(data)
    return resource
  }
}

// Example: Middleware for permission checking
export function requireRole(role: string) {
  return function (req, res, next) {
    if (req.user?.roles?.includes(role)) return next()
    res.status(403).json({ error: 'Forbidden' })
  }
}
```

---

## 🧾 Lessons Learned

- **System modularity** makes changes and feature additions easy.
- Practical **TypeScript typing** prevents whole classes of bugs.
- Middleware layers keep logic focused and secure.
- Testing architecture is as valuable as code implementation.
- Developer experience improves with decoupled, well-typed modules.

---

## ✨ Future Plans

- Integrate database adapters (MongoDB, PostgreSQL examples).
- Add full suite of unit/integration tests.
- Build demo admin UI to showcase resource management.
- Implement advanced permission hierarchies and audit logs.

---

## 👤 Author

Jostin Lopez (J0571N)  
Solo Backend Engineer · TypeScript Enthusiast · Systems Designer

“Big ideas taught me more than small wins.”
