import api from '@/common/js/serve'
let commnoApi = {
    testAll(data) {
        return api('/test/testAll', data, 'get')
    }
}
export default commnoApi