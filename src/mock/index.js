const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    code: 200,
    msg: 'success',
    data: null
}

// Mock.mock('/captcha','get',() => {
//     Result.code=200
//     Result.msg = 'success'
//     Result.data = {
//         token: Random.string(32),
//         captchaImg: Random.dataImage('120x40','p7n5x')
//     }
//     return Result;
// })

Mock.mock('/captcha','get',() => {
    return {
        code: 200,
        msg: 'success',
        data: {
            token: Random.string(32),
            captchaImg: Random.dataImage('120x40', 'p7n5x')
        }
    };
})

Mock.mock('/login','post',() => {
    //cannot mock data in http headers
    Result.code=400
    Result.msg = 'custom errors'
    Result.data = {
        token: Random.string(32),
        captchaImg: Random.dataImage('120x40','p7n5x')
    }
    return Result;
})