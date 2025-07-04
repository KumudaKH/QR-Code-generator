const inp= document.querySelector('#qrInput');
const genBtn= document.querySelector('#generateBtn');
const qrPopup= document.querySelector('#qrPopup');
const qrImg= document.querySelector('#qrImg');
const downloadBtn= document.querySelector('#downloadBtn');
const closeBtn= document.querySelector('#closeBtn');
const mainContainer = document.querySelector('#mainContainer');

const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';

genBtn.addEventListener('click', () => {
    const inputValue=inp.value.trim();
    if(!inp.value) {
        alert('Enter text or URL first !');
    }
    else {
        const imgUrl = baseUrl + inp.value;
        qrImg.setAttribute('src', imgUrl);
        setTimeout(() => {
            qrPopup.classList.add('show');
            mainContainer.classList.add('opacity');   //adding opacity class
        },500)
    }
})

downloadBtn.addEventListener('click', () => {
    const imgUrl = baseUrl + inp.value;            
    fetch(imgUrl)               //api call using fetch method
    .then((res) =>res.blob())  //respnse json inside convert(string --> json ) and blob binary large object => convert url or respnse data in file like object  
                                // used for workng with file data without needing to save it on a server
                                //provide a way to work with file data directly in the broswer 
                                // <a href="url" download>Download</a>          (download link path)    
                                //creating blob  URL.createObjectURL()
                                // <a href="URL.createObjectURL()" download>Download</a>     
    .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'qr.jpg';
        link.click();
    })                          

});
closeBtn.addEventListener('click' , () => {
        qrPopup.classList.remove('show');
        mainContainer.classList.remove('opacity');
})

    

