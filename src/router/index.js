// import { getRoutelist } from '@/api/route'

// const router = []

// window.onload = getRoutelist().then(res => {
//     console.log(res.data)
//     res.data.map((item, index)=> {
//         if (item.pid === 0) {
//             router.push(
//                 {
//                     id: item.id,
//                     key: item.path,
//                     title: item.title,
//                     icon: item.icon,
//                     child: []
//                 }
//             )
//         }
//     })

//     res.data.map((item, index)=> {
//         if (item.pid !== 0) {
//             router.map((item2, inx)=> { 
//                 if (item2.id == item.pid) { 
//                     console.log(item)
//                     item2.child.push({
//                         key: item2.path,
//                         title: item2.title,
//                     })
//                 }
//             })
//         }
//     })

// }).catch(err => {console.log(err)})


// export default router



