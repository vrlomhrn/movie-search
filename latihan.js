// ! Promise
// let result = false;
// const promise1 = new Promise((resolve, reject) => {
//     if(result === true){
//         setTimeout(()=>{
//             resolve('Successful to load!');
//         },2000)
//     }else{
//         setTimeout(()=>{
//             reject('Rejected to load.')
//         }, 2000)
//     }
// })

// console.log('start');
// console.log(promise1);
// promise1
//     .finally(() => console.log('success!'))
//     .then(response => console.log(response))
//     .catch(response => console.log(response))
// console.log('end');

// TODO Promise.all
const mahasiswa = new Promise(resolve => {
    setTimeout(() => {
        resolve([{
            nama: 'Virlo Mahrian Shaffari',
            nrp: 12739071,
            jurusan: 'Teknik Informatika'
        }])
    }, 2000);
})

const Dosen = new Promise(resolve => {
    setTimeout(() => {
        resolve([{
            nama: 'Sandhika Galih',
            nrd: 123456,
            noP: 1
        }])
    }, 1000);
})
Promise.all([mahasiswa, Dosen])
    .then(response => {
        const [mahasiswa, Dosen] = response;
        console.table(mahasiswa);
        console.table(Dosen);
    })