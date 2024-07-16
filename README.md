## Node BFF 模版

- 使用纯ts构建，类型严格帮助代码不容易出错
- 使用grpc连接后端服务，单连接支持多请求并发
- 使用typedi使用注解支持依赖注入

### 快捷启动


#### 快捷启动

```
npx ts-node index.ts
```

#### 访问

```
curl "127.0.0.1:3000/order/324342424?id=1" -v
```

### 部署说明

#### 添加环境变量

```text
DB_HOST = postgresDB host
DB_PORT = postgresDB 端口
DB_USERNAME = postgresDB 用户名
DB_PASSWORD = postgresDB 密码
DB_DATABASE = postgresDB database
GRPC_ADDRESS = GRPC地址
```

## 库说明

typedi

routing-controllers

typeorm

## 常见问题

### grpc相关

#### 序列化错误 `Error: 13 INTERNAL: Response message parsing error: Failure: Invalid wire type: %s (at position %s)`

1. 使用grpcurl请求对应接口

```bash
 grpcurl -plaintext -d '{"VariationID": 3}' -H header-filed:header-value -H header-filed-1:header-value-2 1.1.1.1:10086 ProductService/GetProduct
```

2. 升级proto-ts包，保证interface与proto-ts包字段一致

3. 验证返回内容是否与interface字段一致，不一致则可能是后端返回字段问题

4. 例外情况，proto-ts与代码内interface不一致，则修改代码interface字段

## 目录结构
```bash
- config 配置文件
- controller 用户接口控制器
- domain 模型域
- entities 数据表实体
- infrastructure 基建
    - rpc grpc基建接口
- interceptor 拦截器
- middleware 中间件
- service 服务
    - gateway.ts 网关相关服务
    - oauth.ts   sso服务
    - user.ts    用户相关服务
    - utils.ts   工具函数服务（如：获取通用grpc metadata）
- types 全局类型
- vendor 第三方依赖
    - dingTalk.ts   钉钉消息
    - localCache.ts 本地缓存
    - logger.ts     日志服务
```
