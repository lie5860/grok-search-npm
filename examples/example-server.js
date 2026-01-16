#!/usr/bin/env node

/**
 * MCP 服务器测试脚本
 * 使用环境变量配置，不包含任何硬编码的敏感信息
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { config } from './dist/config/index.js';
import { OpenAISearchProvider } from './dist/providers/openai.js';

async function testMCPServer() {
  console.log('🚀 OpenAI Search MCP 服务器测试\n');

  try {
    // 验证环境变量
    const validation = await config.validate();
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    console.log('✅ 环境变量验证通过');

    // 获取配置
    const openaiConfig = await config.getConfig();
    console.log('📋 当前配置:');
    console.log(`   API URL: ${openaiConfig.apiUrl}`);
    console.log(`   模型: ${openaiConfig.model}\n`);

    // 创建 OpenAI provider
    const provider = new OpenAISearchProvider(
      openaiConfig.apiUrl,
      openaiConfig.apiKey,
      openaiConfig.model
    );

    // 测试直接调用
    console.log('🔎 测试搜索功能...\n');
    const searchResult = await provider.search('MCP 协议介绍', '', 2, 3);
    console.log('搜索结果:');
    console.log(searchResult);
    console.log('\n✅ 搜索功能正常\n');

    // 测试配置信息
    console.log('📊 测试配置诊断...\n');
    console.log(`API URL: ${openaiConfig.apiUrl}`);
    console.log(`模型: ${openaiConfig.model}`);
    console.log('✅ 配置诊断正常\n');

    console.log('✅ 所有测试通过！');
    console.log('\n💡 要启动完整的 MCP 服务器，请运行:');
    console.log('   node dist/server.js');
    console.log('   或');
    console.log('   npx openai-search-mcp\n');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('\n💡 提示: 请确保已设置以下环境变量:');
    console.error('   export OPENAI_API_URL="your-api-endpoint"');
    console.error('   export OPENAI_API_KEY="your-api-key"');
    console.error('   export OPENAI_MODEL="gpt-4o"  # 可选\n');
    console.error('或创建 .env 文件:');
    console.error('   OPENAI_API_URL=your-api-endpoint');
    console.error('   OPENAI_API_KEY=your-api-key');
    console.error('   OPENAI_MODEL=gpt-4o\n');
    process.exit(1);
  }
}

// 运行测试
testMCPServer();
