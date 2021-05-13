function checkUrl(url) {
   const re = new RegExp(/^(http|https):\/\/[^ "]+$/);
   return re.test(url);
}

export default checkUrl 
