const mockjs = require('mockjs')
const total = mockjs.mock('@natural(10, 31)');
module.exports = mockjs.mock({
    [`items|${total}`]: [
        {
            'id|+1': 1,
            title: '@ctitle',
            'user': '@cname'
            // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
            // description: '@cparagraph',
            // content: '@csentence'
        }
    ],
    total
})