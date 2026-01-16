# 代码质量和格式化指南

本项目使用 **ESLint** 和 **Prettier** 来确保代码质量和一致的代码风格。

## 📋 工具配置

### ESLint
- **配置文件**: `eslint.config.js` (ESLint 9+ Flat Config 格式)
- **主要功能**: 代码质量检查、语法错误检测、最佳实践建议
- **TypeScript 支持**: 使用 @typescript-eslint 提供的规则
- **导入排序**: 使用 eslint-plugin-import 自动排序和组织导入语句

### Prettier
- **配置文件**: `.prettierrc.json`
- **主要功能**: 代码格式化、统一的代码风格
- **集成方式**: 通过 eslint-plugin-prettier 与 ESLint 集成

## 🚀 可用命令

### 代码检查

```bash
# 检查代码质量和潜在问题
npm run lint

# 自动修复可以修复的问题
npm run lint:fix
```

### 代码格式化

```bash
# 格式化所有 TypeScript 文件
npm run format

# 检查文件是否已格式化（不修改文件）
npm run format:check
```

### 类型检查

```bash
# 仅执行 TypeScript 类型检查（不生成输出文件）
npm run type-check
```

## 📝 代码规范

### TypeScript 规则

1. **导入排序和组织**
   - 自动按以下顺序组织导入：
     1. Node.js 内置模块 (fs, path, os 等)
     2. 第三方 npm 包 (@modelcontextprotocol/sdk 等)
     3. 内部模块 (../config/, ../utils/ 等)
     4. 类型导入 (import type)
   - 组与组之间空一行分隔
   - 同组内按字母顺序排列
   - 未使用的导入会自动报告并可通过 `lint:fix` 删除

2. **未使用的变量**
   - 使用 `_` 前缀忽略未使用的变量、参数和错误
   - 例如: `_error`, `_ctx`, `_unusedVariable`
   - 未使用的导入会自动被 `lint:fix` 删除

3. **类型安全**
   - 推荐：避免使用 `any` 类型（会警告，但在合理场景下允许）
   - 允许使用 `any` 的场景：
     - 动态 API 响应（如 OPENAI API 的流式响应）
     - 通用配置对象（如 `Record<string, any>`）
     - 第三方库类型定义

3. **空值检查**
   - 谨用非空断言 `!`（会警告）
   - 推荐：使用可选链 `?.`

### 代码风格

1. **分号**: 必须使用
2. **引号**: 使用双引号
3. **行宽**: 最大 100 字符
4. **缩进**: 2 空格
5. **行尾**: LF (Unix 风格)
6. **尾随逗号**: ES5 兼容

### 注释规范

- 使用 `@ts-expect-error` 代替 `@ts-ignore`，并添加说明
- 例如: `// @ts-expect-error - undici types incompatibility`

## 📊 当前 Lint 状态

项目当前有 **19 个警告**，**0 个错误**。

### 警告分类

1. **@typescript-eslint/no-explicit-any** (12个)
   - 这些是合理的使用场景，保留为警告级别
   - 主要用于动态 API 响应和通用配置对象

2. **@typescript-eslint/prefer-nullish-coalescing** (7个)
   - 建议使用 `??` 代替 `||`
   - 当前代码使用 `||` 是有意为之，因为：
     - 对于环境变量，空字符串 `""` 也应该使用默认值
     - 保持代码的一致性和可读性

## 🔄 开发工作流

### 提交代码前

```bash
# 1. 格式化代码
npm run format

# 2. 修复 lint 问题
npm run lint:fix

# 3. 类型检查
npm run type-check

# 4. 构建项目
npm run build

# 5. 运行测试（如果有）
npm test
```

### 一键格式化和检查

```bash
# 格式化 + lint 修复 + 类型检查
npm run format && npm run lint:fix && npm run type-check
```

## ⚙️ VS Code 集成

推荐安装以下 VS Code 扩展：

1. **ESLint** - `dbaeumer.vscode-eslint`
2. **Prettier** - `esbenp.prettier-vscode`
3. **TypeScript** - 内置
4. **Import Cost** (可选) - `wix.vscode-import-cost` - 显示导入包的大小

在项目根目录创建 `.vscode/settings.json`：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.useFlatConfig": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseLibraryTsForDefinitions": true
}
```

## 🎯 常见问题

### Q: ESLint 9 配置文件在哪里？

本项目使用 ESLint 9 的新 Flat Config 格式，配置文件是 `eslint.config.js`，而不是旧的 `.eslintrc.json`。

### Q: 如何忽略某些文件？

在 `eslint.config.js` 的 `ignores` 数组中添加：

```javascript
{
  ignores: [
    "dist/**",
    "build/**",
    "node_modules/**",
    "coverage/**",
    "bin/**",
    "examples/**"
  ]
}
```

### Q: 为什么格式化后还有 lint 错误？

Prettier 负责格式化（代码风格），ESLint 负责代码质量（逻辑错误、最佳实践）。某些 ESLint 规则需要手动修复。

### Q: 如何临时禁用某个规则？

```typescript
// 禁用下一行
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = fetchData();

// 禁用整个文件
/* eslint-disable @typescript-eslint/no-explicit-any */
```

### Q: 什么时候可以使用 `any` 类型？

在以下场景中允许使用 `any` 并保持为警告级别：

1. **动态 API 响应**: 如第三方 API 返回的动态 JSON
2. **通用配置对象**: 如 `Record<string, any>` 用于灵活的配置
3. **类型迁移**: 临时使用 `any` 进行类型系统迁移

## 📚 相关资源

- [ESLint 文档](https://eslint.org/)
- [ESLint 9 Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [Prettier 文档](https://prettier.io/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [typescript-eslint 包](https://github.com/typescript-eslint/typescript-eslint)
