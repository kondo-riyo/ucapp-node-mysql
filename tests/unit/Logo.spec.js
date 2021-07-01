import { shallowMount, mount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

import Logo from '../../src/components/Logo.vue'
describe('Logo.js',()=>{
  // const wrapper = mount(Logo)
  // it('マウントされたよ！',()=>{
  //   expext(wrapper.html()).toContain('<p> <router-link to="/" class="link"><img src="../assets/brown.png" class="mainicon"></router-link></p>')
  // })
    it('shallowMount vs mount',()=>{
        let shallow =shallowMount(Logo)
        let deep = mount(Logo)
        //各結果を確認
        console.log(shallow.html())
        console.log(deep.html())
    })
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
