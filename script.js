async function cloneWebsite() {
  const url = document.getElementById("urlInput").value;
  const output = document.getElementById("output");
  const preview = document.getElementById("preview");

  if(!url) return alert("Please enter a URL!");

  output.textContent = "⏳ Fetching website...";
  
  try {
    // Using AllOrigins proxy to bypass CORS
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    // Show HTML in <pre>
    output.textContent = data.contents || "❌ Could not fetch website.";

    // Show website in iframe
    preview.srcdoc = data.contents;
    
    // Save to localStorage for quick reload later
    localStorage.setItem("lastURL", url);
    localStorage.setItem("lastHTML", data.contents);
  } catch (err) {
    output.textContent = "⚠️ Error: " + err.message;
  }
}

function downloadCode(){
  const code = document.getElementById("output").textContent;
  const blob = new Blob([code], {type:"text/html"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "cloned.html";
  link.click();
}

function toggleTheme(){
  document.body.classList.toggle("dark");
}

window.onload = () => {
  if(localStorage.getItem("lastURL")){
    document.getElementById("urlInput").value = localStorage.getItem("lastURL");
    document.getElementById("output").textContent = localStorage.getItem("lastHTML");
    document.getElementById("preview").srcdoc = localStorage.getItem("lastHTML");
  }
};
