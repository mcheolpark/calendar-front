export default class ScheduleService {
    static async get($vue, params) {
        const response = await $vue.$axios.get(`http://localhost:8080/schedule/${params.year}/${params.month}`);
        return response;
    }
    
    static async save($vue, params) {
        let response = null;
    
        try {
            if (params.id) {
                response = await $vue.$axios.put('http://localhost:8080/put-schedule', params);
            }
            else {
                response = await $vue.$axios.post('http://localhost:8080/post-schedule', params);
            }
        }
        catch(e) {
            window.alert('일정이 중복되었습니다');
            return e;
        }
        
        return response;
    }
    
    static async delete($vue, id) {
        let response = await $vue.$axios.delete(`http://localhost:8080/schedule/${id}`);
        return response;
    }
}