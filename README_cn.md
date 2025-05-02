# 0gong-net

0gong-net 是一个现代化的电子商品、信息产品和虚拟货物交易平台。基于 Next.js、React 和 Payload CMS 构建，支持多租户架构，允许用户创建自己的店铺并无缝销售数字产品。

## 功能特点

- 用户注册和认证，支持多租户（每个用户拥有自己的店铺）
- 商品列表展示，支持筛选、排序和分页
- 集成 Stripe 支付网关的购物车和结账功能
- 商品评价和评分系统
- 基于 Payload CMS 的管理后台，用于内容和用户管理
- 使用 Tailwind CSS 和 Radix UI 组件构建响应式界面
- 通过 tRPC 实现类型安全的客户端与服务器端通信

## 技术栈

- Next.js（React 框架）
- React 19
- Payload CMS
- tRPC
- Stripe API
- Tailwind CSS
- TypeScript
- Zod 用于模式验证
- React Hook Form 用于表单管理

## 快速开始

### 前置条件

- Node.js（推荐版本）
- MongoDB（用于 Payload CMS 数据库）
- Stripe 账户（用于支付处理）

### 安装步骤

1. 克隆仓库：

```bash
git clone https://github.com/your-repo/0gong-net.git
cd 0gong-net
```

2. 安装依赖：

```bash
npm install
```

3. 配置环境变量（例如 MongoDB URI、Stripe 密钥）到 `.env` 文件。

4. 运行数据库迁移并初始化数据：

```bash
npm run db:fresh
npm run db:seed
```

5. 启动开发服务器：

```bash
npm run dev
```

6. 在浏览器打开 [http://localhost:3000](http://localhost:3000)。

## 项目结构

- `src/app` - Next.js 应用路由和页面
- `src/modules` - 功能模块（认证、商品、结账、评论、租户等）
- `src/components` - 可复用的 UI 组件
- `src/collections` - Payload CMS 集合定义
- `src/lib` - 工具函数和 API 客户端
- `src/trpc` - tRPC 客户端和服务器端设置

## 贡献

欢迎贡献！请提交 issue 或 pull request 以改进和修复问题。

## 许可证

本项目为私有项目，未授权公开使用。
