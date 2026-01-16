#!/usr/bin/env node

/**
 * 直接测试 OpenAI Search 功能
 * 使用环境变量配置，不包含任何硬编码的敏感信息
 */

import { OpenAISearchProvider } from './dist/providers/openai.js';
import { config } from './dist/config/index.js';

async function testDirectSearch() {
  console.log('🔍 OpenAI Search 直接测试\n');

  try {
    // 验证环境变量
    await config.validate();
    console.log('✅ 环境变量验证通过\n');

    // 获取配置
    const openaiConfig = await config.getConfig();
    console.log('📋 当前配置:');
    console.log(`   API URL: ${openaiConfig.apiUrl}`);
    console.log(`   模型: ${openaiConfig.model}`);
    console.log(`   调试模式: ${openaiConfig.debug ? '开启' : '关闭'}\n`);

    // 创建 provider
    const provider = new OpenAISearchProvider(
      openaiConfig.apiUrl,
      openaiConfig.apiKey,
      openaiConfig.model
    );

    // 测试搜索
    console.log('🔎 测试搜索: TypeScript 5.5 新特性\n');
    const searchResults = await provider.search(
      'TypeScript 5.5 新特性',
      '',
      3,
      5
    );

    console.log('📊 搜索结果:');
    console.log(searchResults);
    console.log('\n✅ 搜索测试完成\n');

    // 测试网页抓取
    console.log('📄 测试网页抓取: TypeScript 官方文档\n');
    const fetchResult = await provider.fetch(
      'https://www.typescriptlang.org/docs/handbook/intro.html'
    );

    console.log('📊 抓取结果（前 500 字符）:');
    console.log(fetchResult.substring(0, 500) + '...\n');
    console.log('✅ 网页抓取测试完成\n');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('\n💡 提示: 请确保已设置以下环境变量:');
    console.error('   - OPENAI_API_URL');
    console.error('   - OPENAI_API_KEY');
    console.error('   - OPENAI_MODEL (可选)');
    process.exit(1);
  }
}

// 运行测试
testDirectSearch();
