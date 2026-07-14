/* ============================================================
 * 欧规雷达 · Runtime Config
 * ============================================================
 *
 * 这个文件是可选的运行时配置,用于启用订阅表单的后端提交。
 *
 * 使用步骤:
 *   1. 复制本文件为 runtime-config.js:
 *        cp public/runtime-config.example.js public/runtime-config.js
 *      Windows PowerShell:
 *        Copy-Item public/runtime-config.example.js public/runtime-config.js
 *
 *   2. 把下面的 API_BASE_URL 改成你的真实后端地址,例如:
 *        API_BASE_URL: 'https://api.eurorule.example.com'
 *      注意:
 *        - 必须是 https:// 开头的绝对 URL,不能是相对路径
 *        - 不要带尾部斜杠
 *        - 不要包含真实密钥
 *
 *   3. public/runtime-config.js 已在 .gitignore 中,不会被提交。
 *
 * 行为:
 *   - 文件存在 + API_BASE_URL 合法 (https:// 开头):订阅表单变为可用,
 *     提交时 POST 到 `${API_BASE_URL}/api/v1/subscriptions`
 *   - 文件不存在 / API_BASE_URL 不合法:订阅表单禁用,UI 显示
 *     "订阅功能即将开放",不会发出任何网络请求
 *
 * 后端接口约定:
 *   POST {API_BASE_URL}/api/v1/subscriptions
 *   Content-Type: application/json
 *   Body: { email: string, topics: string[], consent: boolean }
 *   成功: 2xx;失败:4xx/5xx,前端会显示明确失败提示,不会假装成功。
 * ============================================================ */

window.__EURORULE_RUNTIME_CONFIG__ = {
  // API_BASE_URL: 'https://api.your-domain.com',
};
