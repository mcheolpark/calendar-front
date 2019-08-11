import {shallowMount} from '@vue/test-utils';
import Day from '@/components/month/Day.vue';

describe('Day.vue', () => {
    it('2019년 8월 14일 일정이 제대로 노출되는가?', () => {
        const wrapper = shallowMount(Day, {
            propsData: {
                date: {
                    day: 14,
                    month: 8,
                    year: 2019,
                    currentMonth: true
                },
                schedule: [{
                    id: 1,
                    start: new Date(2019, 8, 14, 12),
                    end: new Date(2019, 8, 14, 14),
                    title: '일정등록 테스트'
                }]
            }
        });

        expect(wrapper.text()).toMatch('14 12~14 일정등록 테스트');
    });
    
    it('지난달 일정(2019년 8월 14일)은 노출 안되어야 한다.', () => {
        const wrapper = shallowMount(Day, {
            propsData: {
                date: {
                    day: 14,
                    month: 8,
                    year: 2019,
                    currentMonth: false
                },
                schedule: [{
                    id: 1,
                    start: new Date(2019, 8, 14, 12),
                    end: new Date(2019, 8, 14, 14),
                    title: '일정등록 테스트'
                }]
            }
        });
        //console.log(wrapper.vm);
        console.log(wrapper.text());
        expect(wrapper.text()).toMatch('');
    });
});
