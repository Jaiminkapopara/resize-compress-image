const uploadBox = document.querySelector('.upload-box')
const fileInput = uploadBox.querySelector('input')
const previewImg = uploadBox.querySelector('img')
const widthInput = document.querySelector('.width input')
const heightInput = document.querySelector('.height input')
const ratioInput = document.querySelector('.ratio input')
const qualityInput = document.querySelector('.quality input')
const downloadBtn = document.querySelector('.download-btn')

let ogImageRatio 

const loadFile = (e) =>{
    const file = e.target.files[0] //getting first user selected file

    if(!file) return //if no file selected then do nothing
    previewImg.src = URL.createObjectURL(file) //passing selected file url to preview img src
    previewImg.addEventListener('load', () => {
        document.querySelector('.wrapper').classList.add('active')
        widthInput.value = previewImg.naturalWidth
        heightInput.value = previewImg.naturalHeight
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight
    })

}

widthInput.addEventListener('keyup', () => {
    // getting height according to the ratio checkbox status
    const height = ratioInput.checked ? (widthInput.value / ogImageRatio) : heightInput.value
    heightInput.value = Math.floor(height)
})

widthInput.addEventListener('change', () => {
    // getting height according to the ratio checkbox status
    const height = ratioInput.checked ? (widthInput.value / ogImageRatio) : heightInput.value
    heightInput.value = Math.floor(height)
})

heightInput.addEventListener('keyup', () => {
    // getting width according to the ratio checkbox status
    const width = ratioInput.checked ? (heightInput.value / ogImageRatio) : widthInput.value
    widthInput.value = Math.floor(width)
})

heightInput.addEventListener('change', () => {
    // getting width according to the ratio checkbox status
    const width = ratioInput.checked ? (heightInput.value / ogImageRatio) : widthInput.value
    widthInput.value = Math.floor(width)
})

const resizeAndDownload = () => {
    const canvas = document.createElement('canvas')
    const a = document.createElement('a')
    const ctx = canvas.getContext('2d')

    //if quality checkbox is checked , pass 0.7 to imgQuality else pass 1.0
    //1.0 is 100% quality where 0.7 is 70% , you can from 0.1 to 1.0
    const imgQuality = qualityInput.checked ? 0.7 : 1.0

    //setting canvas height & width according to the input values 
    canvas.width = widthInput.value
    canvas.height = heightInput.value

    //drawing user selected image onto the canvas 
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height)

    //passing canvas data url as href value of <a> element 
    a.href = canvas.toDataURL('image/jpeg', imgQuality)
    a.download = new Date().getTime() //passing current time as download value
    a.click() // clicking <a> element to the file download

}

downloadBtn.addEventListener('click', resizeAndDownload)
fileInput.addEventListener('change', loadFile)
uploadBox.addEventListener('click', () => fileInput.click())