const rss_feed = document.getElementById("rss_url");
const numberOfTitles = document.getElementById("numberOfTitles");
const convertButton = document.getElementById('convert');
const previewText = document.getElementById("preview-text");
const content = document.getElementById("feed-container");
const container = document.querySelector("#rss-feed");
const tbody = document.querySelector("#rss-feed-body");
const copyButton = document.getElementById("copy");
const clearButton = document.getElementById("clear");


convertButton.addEventListener("click", () => {
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rss_feed.value}`)
    .then(response => response.json())
    .then(data => {
      tbody.innerHTML = ""; // Resets tbody
      const site = rss_feed.options[rss_feed.selectedIndex].getAttribute('data-site'); // Grab titles from feed
      const items = data.items.slice(0, numberOfTitles.value);  // Grab titles from feed
      createBanner(site);
      createTitles(items);

      container.style.backgroundColor = "#F4F4F4";

      tbodyCheck();
    });
});

// Create Banner
function createBanner(site) {
  const bannerRow = document.createElement("tr");
  const bannerData = document.createElement("td");
  const hyperlink = document.createElement("a");

  const banner = document.createElement("img");
  if (site === "SI") {
    hyperlink.href = "https://www.sustainable-investment.com/";
    const text = document.createElement("h3");
    text.textContent = "Content from Sustainable-Investment.com";
    text.style.fontSize = "17px";
    text.style.textAlign = "center";
    bannerData.append(text);
    banner.src = "https://msgfocus.com/files/amf_incisive_business/workspace_88/SI22-600x200-newletter_header_latestcontent.jpg";
    banner.alt = "Sustainable-Investment banner: Latest Content";
  } else if (site === "IQ") {
    hyperlink.href = "https://www.investmentiq.co.uk/";
    banner.src = "https://msgfocus.com/files/amf_incisive_business/workspace_96/IWIQ23-500x150.jpg";
    banner.alt = "Investment IQ banner";
  }
  
  banner.style.padding = "16px 0";
  banner.style.width = "100%";
  banner.style.display = "block";
  banner.style.margin = "0 auto";
  bannerData.setAttribute("align","center");

  hyperlink.appendChild(banner);
  bannerData.appendChild(hyperlink);
  bannerRow.appendChild(bannerData);
  tbody.append(bannerRow);
}

// Create Titles
function createTitles(items){
  const titlesRow = document.createElement("tr");
  const titlesData = document.createElement("td");
  titlesData.style.width = "100%";

      items.forEach(item => {
        const title = item.title;
        const link = item.link;
        const titleName = document.createElement("h3");
        const hyperlink = document.createElement("a");
        const hr = document.createElement("hr");
        hr.style.margin = "10px 0";
        hr.style.width = "100%";
        hyperlink.href = link;
        hyperlink.textContent = title;
        hyperlink.style.textDecoration = "none";
    
        hyperlink.style.color = "#000000";
        // hyperlink.addEventListener("mouseover", () => {
        //   hyperlink.style.color = "#65d9cd";
        // });
        // hyperlink.addEventListener("mouseout", () => {
        //   hyperlink.style.color = "#25254f";
        // });
        titleName.appendChild(hyperlink);
        titlesData.appendChild(titleName);
    
        if (item !== items.at(-1)){
          titlesData.appendChild(hr);
        }

      });

      titlesData.setAttribute("align","left");
      titlesData.style.display = "inline-block";
      titlesRow.appendChild(titlesData);
      tbody.appendChild(titlesRow);
}

// Reset tbody
function tbodyCheck() {
  if (tbody.innerHTML.trim() !== "") {
    content.style.display = "block";
    previewText.style.display = "block";
    copyButton.style.display = "block";
    clearButton.style.display = "block";
    setTimeout(function () {
      previewText.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  } else {
    content.style.display = "none";
    previewText.style.display = "none";
    copyButton.style.display = "none";
    clearButton.style.display = "none";
  }
}

tbodyCheck();

// Copy to clipboard
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

// Clear tbody
clearButton.addEventListener("click", () => {
  tbody.innerHTML = "";
  tbodyCheck();
})