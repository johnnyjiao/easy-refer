import Mock from 'mockjs'
import {REQUIRED_REFER_FIELD_VALUES} from '@/contents/refer'

const expiration = [3, 5, 7]
const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']

Mock.mock(/\/job\?userId=\S*&page=\d*/, 'get', {
  success: true,
  message: '成功获取数据',
  content: {
    'jobs|10': [{
      'id|+1': 1,
      title: '@CSENTENCE',
      content: '@CPARAGRAPH',
      'company|1': companies,
      requiredFields: [...REQUIRED_REFER_FIELD_VALUES],
      deadline: '@DATE',
      'expiration|1': expiration,
      referredCount: '@INTEGER(100, 400)',
      referTotal: '@INTEGER(100, 500)',
      referer: '@CNAME',
      imageUrl: '@DATAIMAGE(\'50x50\',\'@company\')',
      source: '@URL'
    }],
    totalPages: 60
  }
})

Mock.mock(/\/job\?userId=\S*&jobId=\S*/, 'get', {
  success: true,
  message: '成功获取数据',
  content: {
    'id|+1': 1,
    title: '@CSENTENCE',
    content: '@CPARAGRAPH',
    'company|1': companies,
    requiredFields: [...REQUIRED_REFER_FIELD_VALUES],
    deadline: '@DATE',
    'expiration|1': expiration,
    referredCount: '@INTEGER(100, 400)',
    referTotal: '@INTEGER(100, 500)',
    referer: '@CNAME',
    imageUrl: '@DATAIMAGE(\'50x50\',\'@company\')',
    source: '@URL'
  }
})
Mock.mock('/job', 'post', (options: any) => {
  return {
    success: true,
    message: '发布成功',
    content: JSON.parse(options.body)
  }
})
