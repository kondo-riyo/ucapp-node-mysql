import { shallowMount, mount } from '@vue/test-utils'
import Header from '../../src/components/Header.vue'
describe('Header.js',()=>{
it('shallowMount vs mount',()=>{
    let shallow =shallowMount(Header)
    let deep = mount(Header)
    //各結果を確認
    console.log(shallow.html())
    console.log(deep.html())
})

    //   const wrapper = mount(Header)

//   it('has a table',()=>{
//       expect(wrapper.contains('router-link')).toBe(true)
//   })
})
// describe('Counter', () => {
//   // コンポーネントがマウントされ、ラッパが作成されます。
//   const wrapper = mount(Counter)

//   it('renders the correct markup', () => {
//     expect(wrapper.html()).toContain('<span class="count">0</span>')
//   })

//   // 要素の存在を確認することも簡単です
//   it('has a button', () => {
//     expect(wrapper.contains('button')).toBe(true)
//   })
// })