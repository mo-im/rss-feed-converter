const rss_feed = document.getElementById("rss_url");
const numberOfTitles = document.getElementById("numberOfTitles");
const convertButton = document.getElementById('convert');
const previewText = document.getElementById("preview-text");
const container = document.querySelector("#rss-feed");
const copyButton = document.getElementById("copy");
const clearButton = document.getElementById("clear");


convertButton.addEventListener("click", () => {
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rss_feed.value}`)
    .then(response => response.json())
    .then(data => {
      container.innerHTML = "";
      const site = rss_feed.options[rss_feed.selectedIndex].getAttribute('data-site');
      const items = data.items.slice(0, numberOfTitles.value);
      createBanner(site);
      const listElement = document.createElement("ul");
      items.forEach(item => {
        const title = item.title;
        const link = item.link;
        const titleElement = document.createElement("h3");
        titleElement.style.paddingTop = "10px";
        const linkElement = document.createElement("a");
        linkElement.href = link;
        linkElement.textContent = title;
        linkElement.style.color = "#25254f";
        linkElement.addEventListener("mouseover", () => {
          linkElement.style.color = "#65d9cd";
        });
        linkElement.addEventListener("mouseout", () => {
          linkElement.style.color = "#25254f";
        });
        titleElement.appendChild(linkElement);
        const listItemElement = document.createElement("li");
        listItemElement.appendChild(titleElement);
        listElement.appendChild(listItemElement);
      });
      container.appendChild(listElement);
      containerCheck();
    });
});


function createBanner(site) {
  const banner = document.createElement("img");
  if (site === "SI") {
    const text = document.createElement("h3");
    text.textContent = "Content from Sustainable-Investment.com";
    text.style.paddingBottom = "10px";
    text.style.fontSize = "17px";
    text.style.textAlign = "center";
    container.append(text);
    banner.src = "https://msgfocus.com/files/amf_incisive_business/workspace_88/SI22-600x200-newletter_header_latestcontent.jpg";
  } else if (site === "IQ") {
    banner.src = "https://msgfocus.com/files/amf_incisive_business/workspace_96/IWIQ23-500x150.jpg";
  }
  banner.alt = "image: Are real assets the answer to managing inflation?"
  banner.style.width = "500px";
  banner.style.display = "block";
  banner.style.margin = "10px auto";
  container.style.backgroundColor = "#FFFFFF";
  container.style.border = "1px solid #F4F4F4";
  container.margin = "10px 0";
  container.append(banner);
}

function containerCheck() {
  if (container.innerHTML !== "") {
    copyButton.style.display = "block";
    clearButton.style.display = "block";
    container.style.display = "block";
    previewText.style.display = "block";
    setTimeout(function () {
      previewText.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  } else {
    copyButton.style.display = "none";
    clearButton.style.display = "none";
    container.style.display = "none";
    previewText.style.display = "none";
  }
}

containerCheck();

// JavaScript code to copy the innerHTML of the div to the clipboard
copyButton.addEventListener("click", () => {
  const text = document.getElementById("feed-container").innerHTML;
  const temp = document.createElement("input");
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Copied to clipboard: " + text);
})

clearButton.addEventListener("click", () => {
  container.innerHTML = "";
  containerCheck();
})