<div align="center">

# OpenAI Search MCP

[English](./README.md) | 简体中文

**🚀 通过 MCP 协议将 OpenAI 兼容 API 强大的搜索能力集成到 Claude，突破知识限制，实时获取最新信息**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js 18+](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-1.0.0+-purple.svg)](https://modelcontextprotocol.io/)![img.png](img.png)
[![npm version](https://badge.fury.io/js/openai-search-mcp.svg)](https://www.npmjs.com/package/openai-search-mcp)

[功能特性](#-核心特性) • [快速开始](#-快速开始) • [使用指南](#-使用指南) • [故障排除](#-故障排除)

</div>

---

## 📖 概述

OpenAI Search MCP 是一个高性能的 Node.js/TypeScript 版本的 MCP（Model Context Protocol）服务器，通过集成 OpenAI 兼容 API 的强大能力，为 Claude、Claude Code 等 AI 助手提供实时网络搜索和网页内容抓取功能。

### ✨ 核心特性

- 🌐 **实时网络搜索** - 突破 AI 知识截止限制，获取最新信息
- 🔍 **智能网页抓取** - 提取完整网页内容并转换为结构化 Markdown
- 🔄 **自动重试机制** - 智能处理网络波动和临时错误
- 📦 **即插即用** - 通过 `npx` 一键运行，无需复杂配置
- ⚡ **高性能** - 冷启动 < 1 秒，内存占用 < 30MB
- 🔒 **类型安全** - 完整的 TypeScript 类型定义
- 🛠️ **Fetch Polyfill** - 兼容所有 Node.js 18+ 环境

---

## 🎯 为什么选择 OpenAI Search MCP？

| 特性 | 官方 WebSearch | OpenAI Search MCP |
|------|---------------|-----------------|
| **搜索质量** | 通用 | **AI 增强** 🧠 |
| **网页抓取** | 基础 | **深度提取** 📄 |
| **启动速度** | 较慢 | **< 1 秒** ⚡ |
| **定制化** | 固定 | **高度可配置** ⚙️ |
| **成本** | 付费 | **使用自己的 API Key** 💰 |

---

## 🚀 快速开始

### 前置要求

- **Node.js 18+** (支持 fetch API 和 ES Modules)
- **OpenAI 兼容的 API** - 本项目使用 OpenAI API 格式。你需要：
  - 一个 API 端点（例如 API 代理、OpenAI 兼容服务）
  - 该端点的 API 密钥
- **Claude Desktop** (可选，用于 GUI 集成)

### 方式一：使用 npx (推荐)

**无需安装**，直接运行最新版本：

```bash
npx openai-search-mcp
```

### 方式二：全局安装

```bash
npm install -g openai-search-mcp
openai-search
```

---

## ⚙️ 配置 Claude Desktop

### Step 1: 获取 API 端点和密钥

本项目使用 **OpenAI API 格式**。你需要一个兼容 OpenAI API 规范的 API 端点。

**可选方案**：
1. **其他 OpenAI 兼容 API**：任何遵循 OpenAI API 格式的服务

你需要准备：
- `OPENAI_API_URL`：你的 API 端点 URL（例如 `https://api.openai.com/v1`）
- `OPENAI_API_KEY`：该端点的 API 密钥
- `OPENAI_MODEL`：模型标识符（默认：`gpt-4o`）

### Step 2: 配置环境变量

编辑 `~/.config/claude/claude_desktop_config.json` (macOS/Linux) 或 `%APPDATA%\claude\claude_desktop_config.json` (Windows)：

```json
{
  "mcpServers": {
    "openai-search": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "openai-search-mcp"],
      "env": {
        "OPENAI_API_URL": "https://api.openai.com/v1",
        "OPENAI_API_KEY": "your-api-key-here",
        "OPENAI_MODEL": "gpt-4o"
      }
    }
  }
}
```

**重要提示**：
- 将 `https://your-api-endpoint.com/v1` 替换为你的实际 API 端点
- 将 `your-api-key-here` 替换为你的实际 API 密钥
- 该端点必须是 **OpenAI 兼容的**

### Step 3: 重启 Claude Desktop

配置完成后，**完全退出并重启** Claude Desktop 应用。

### Step 4: 验证安装

在 Claude 对话中输入：

```
显示 openai-search 配置信息
```

或者

```
搜索最新的 TypeScript 5.5 特性
```

---

## 🛠️ 可用工具

### 1️⃣ `web_search` - 网络搜索

执行智能搜索并返回结构化结果。

**参数：**
- `query` (必填) - 搜索关键词
- `platform` (可选) - 指定平台，如 "github", "stackoverflow"
- `min_results` (可选) - 最少结果数，默认 3
- `max_results` (可选) - 最多结果数，默认 10

**使用示例：**
```
搜索最新的 Next.js 15 更新内容
搜索 TypeScript 5.5 新特性，返回 5 个结果
在 GitHub 上搜索 Electron 相关项目
```

### 2️⃣ `web_fetch` - 网页抓取

提取指定 URL 的完整内容并转换为 Markdown 格式。

**参数：**
- `url` (必填) - 要抓取的网页地址

**使用示例：**
```
抓取 https://github.com/lie5860/openai-search-mcp 的 README 内容
获取 https://www.typescriptlang.org/docs 的完整文档
```

### 3️⃣ `get_config_info` - 配置诊断

获取当前配置信息和连接状态。

**返回信息：**
- API URL 和模型配置
- 连接测试结果
- 响应时间和可用模型信息

**使用示例：**
```
显示 openai-search 配置信息
```

### 4️⃣ `switch_model` - 模型切换

动态切换 AI 模型。

**参数：**
- `model` (必填) - 模型 ID（如 "gpt-4o", "gpt-4o-mini"）

**使用示例：**
```
切换到 gpt-4o-mini 模型
切换模型为 gpt-4o
```

### 5️⃣ `toggle_builtin_tools` - 工具管理

禁用/启用 Claude 内置的搜索工具。

**参数：**
- `action` (可选) - "on" 禁用内置工具, "off" 启用内置工具, "status" 查看状态

**使用示例：**
```
禁用官方 WebSearch 工具
查看当前工具状态
```

---

## 💻 开发指南

### 从源码构建

```bash
# 克隆仓库
git clone https://github.com/lie5860/openai-search-mcp.git
cd openai-search-mcp

# 安装依赖
npm install

# 构建 TypeScript
npm run build

# 运行开发服务器
npm run dev

# 运行测试
npm test
```

### 项目结构

```
openai-search-mcp/
├── src/
│   ├── server.ts          # MCP 服务器主入口
│   ├── config/            # 配置管理模块
│   ├── providers/         # OpenAI 兼容 API 提供者
│   ├── utils/             # 工具函数（fetch polyfill, retry, logger）
│   └── types/             # TypeScript 类型定义
├── bin/
│   └── openai-search.js   # CLI 命令入口
├── dist/                  # 编译输出目录
├── package.json
├── tsconfig.json
└── README.md
```

### 技术栈

- **运行时**: Node.js 18+
- **语言**: TypeScript 5.5+
- **MCP SDK**: @modelcontextprotocol/sdk ^1.0.4
- **HTTP 客户端**: Fetch API + Undici (自动 polyfill)
- **配置管理**: dotenv
- **模块系统**: ES Modules (ESM)

---

## 🔧 环境变量

| 变量名 | 说明 | 必填 | 默认值 |
|--------|------|------|--------|
| `OPENAI_API_URL` | OpenAI 兼容的 API 端点 | 是 | - |
| `OPENAI_API_KEY` | 你的 API 密钥 | 是 | - |
| `OPENAI_MODEL` | 模型标识符 | 否 | `gpt-4o` |
| `DEBUG` | 调试模式 | 否 | `false` |
| `OPENAI_LOG_LEVEL` | 日志级别 | 否 | `INFO` |

---

## 🔥 故障排除

### ❌ 问题 1: 连接失败

**错误信息**: `❌ 连接失败` 或 `API error`

**解决方案：**
1. 检查 `OPENAI_API_URL` 是否正确且指向 OpenAI 兼容的端点
2. 验证 `OPENAI_API_KEY` 对你的 API 提供商是否有效
3. 确认网络连接正常
4. 使用 `get_config_info` 工具诊断

### ❌ 问题 2: 模块未找到

**错误信息**: `Cannot find module`

**解决方案：**
```bash
# 重新安装依赖
npm install

# 重新构建
npm run build
```

### ❌ 问题 3: 权限错误

**错误信息**: `EACCES`

**解决方案：**
```bash
# Linux/macOS 使用 sudo
sudo npm install -g openai-search-mcp

# 或推荐使用 npx（无需权限）
npx openai-search-mcp
```

### ❌ 问题 4: fetch is not defined

**错误信息**: `ReferenceError: fetch is not defined`

**原因**: Node.js 环境中 fetch API 未正确初始化

**解决方案：**
1. **检查 Node.js 版本**:
```bash
node --version  # 应该 >= 18.0.0
```

2. **确保使用最新版本**（v1.0.1+ 已内置 fetch polyfill）:
```bash
npm update openai-search-mcp
# 或直接使用 npx
npx openai-search-mcp
```

3. **如果问题持续**，请提交 Issue:
   [https://github.com/lie5860/openai-search-mcp/issues](https://github.com/lie5860/openai-search-mcp/issues)

---

## 📝 高级配置

### Claude Desktop 提示词优化

编辑 `~/.claude/CLAUDE.md` 并添加以下内容，以获得更好的使用体验：

```markdown
# OpenAI Search MCP 使用指南

## 激活时机
- 网络搜索需求时优先使用 OpenAI Search
- 需要获取最新信息时自动激活
- 网页内容抓取时使用 web_fetch

## 工具选择策略
| 场景 | 推荐工具 | 参数建议 |
|------|---------|---------|
| 快速搜索 | web_search | min_results=3, max_results=5 |
| 深度研究 | web_search + web_fetch | 先搜索，再抓取关键页面 |
| 特定平台 | web_search | 设置 platform 参数 |
| 完整文档 | web_fetch | 直接抓取 URL |

## 输出规范
- **必须标注来源**: `[标题](URL)`
- **时间敏感信息**: 注明获取日期
- **多源验证**: 交叉验证重要信息
- **禁止编造**: 无结果时明确告知

## 错误处理
- 搜索无结果 → 放宽查询条件或更换关键词
- 连接失败 → 使用 get_config_info 诊断
- 超时 → 降低 max_results 或重试
```

---

## 📊 性能对比

| 指标 | Python 版本 | Node.js 版本 (本项⽬) |
|------|------------|---------------------|
| **冷启动时间** | ~2-3 秒 | **< 1 秒** ⚡ |
| **内存占用** | ~50MB | **< 30MB** 💾 |
| **包大小** | ~15MB | **~5MB** 📦 |
| **类型安全** | 类型提示 | **完整 TypeScript** 🔒 |
| **部署难度** | 需要虚拟环境 | **npx 一键运行** 🚀 |

---

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目基于 [MIT License](../LICENSE) 开源。

---

## 🙏 致谢

- [Model Context Protocol](https://modelcontextprotocol.io/) - 强大的 AI 上下文协议
- [Claude](https://claude.ai/) - Anthropic 出色的 AI 助手

### 🌟 原项目致敬

本项目基于 [GuDaStudio/GrokSearch](https://github.com/GuDaStudio/GrokSearch) (MIT License) 改造而来，感谢原作者的出色工作！

**主要改动**：
- ✅ 从 Python 迁移到 TypeScript/Node.js
- ✅ 添加 Fetch Polyfill，提升环境兼容性
- ✅ 优化项目结构和模块化设计
- ✅ 完整的 TypeScript 类型定义
- ✅ 更快的启动速度和更小的包体积

**重要提示**：本项目使用 **OpenAI API 格式**，需要 OpenAI 兼容的 API 端点。

原项目（Python 版本）同样优秀，如果你更熟悉 Python 生态，推荐使用原版：
- 🔗 [GuDaStudio/GrokSearch](https://github.com/GuDaStudio/GrokSearch)

---

## 📮 联系方式

- **GitHub**: [https://github.com/lie5860/openai-search-mcp](https://github.com/lie5860/openai-search-mcp)
- **Issues**: [https://github.com/lie5860/openai-search-mcp/issues](https://github.com/lie5860/openai-search-mcp/issues)
- **NPM**: [https://www.npmjs.com/package/openai-search-mcp](https://www.npmjs.com/package/openai-search-mcp)

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐️ Star！**

Made with ❤️ by [lie5860](https://github.com/lie5860)

</div>
