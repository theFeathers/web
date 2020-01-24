function hashHandler(e) {
    document.querySelector("a[href*='#" + e.oldURL.split('#')[1] + "']").classList.remove("current");
    document.querySelector("a[href*='" + location.hash + "']").classList.add("current");
}
  
window.addEventListener('hashchange', hashHandler, false);