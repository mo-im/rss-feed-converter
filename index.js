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
      container.innerHTML = ""; // Resets container
      const site = rss_feed.options[rss_feed.selectedIndex].getAttribute('data-site'); // Grab titles from feed
      const items = data.items.slice(0, numberOfTitles.value);  // Grab titles from feed
      createBanner(site);
      createTitles(items);

      container.style.backgroundColor = "#F4F4F4";
      container.style.padding = "16px";
      container.style.width = "600px";
      
      containerCheck();
    });
});

// Create Banner
function createBanner(site) {
  const bannerBody = document.createElement("tbody");
  const bannerRow = document.createElement("tr");
  const bannerData = document.createElement("td");
  const hyperlink = document.createElement("a");

  const banner = document.createElement("img");
  if (site === "SI") {
    hyperlink.href = "https://www.sustainable-investment.com/";
    const text = document.createElement("h3");
    text.textContent = "Content from Sustainable-Investment.com";
    text.style.paddingBottom = "16px";
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
  banner.style.width = "500px";
  banner.style.display = "block";
  banner.style.margin = "0 auto";
  bannerData.setAttribute("align","center");

  hyperlink.appendChild(banner);
  bannerData.appendChild(hyperlink);
  bannerRow.appendChild(bannerData);
  bannerBody.append(bannerRow);
  container.append(bannerBody);
}

// Create Titles
function createTitles(items){
  const titlesBody = document.createElement("tbody");
  const titlesRow = document.createElement("tr");
  const titlesData = document.createElement("td");

  const listElement = document.createElement("ul");
      items.forEach(item => {
        const title = item.title;
        const link = item.link;
        const titleName = document.createElement("h3");
        titleName.style.paddingTop = "16px";
        const hyperlink = document.createElement("a");
        hyperlink.href = link;
        hyperlink.textContent = title;
        hyperlink.style.color = "#25254f";
        // hyperlink.addEventListener("mouseover", () => {
        //   hyperlink.style.color = "#65d9cd";
        // });
        // hyperlink.addEventListener("mouseout", () => {
        //   hyperlink.style.color = "#25254f";
        // });
        titleName.appendChild(hyperlink);
        const listItemElement = document.createElement("li");
        listItemElement.appendChild(titleName);
        listElement.appendChild(listItemElement);
      });

      titlesData.setAttribute("align","left");
      titlesData.style.width = "600px";

      titlesData.appendChild(listElement);
      titlesRow.appendChild(titlesData);
      titlesBody.appendChild(titlesRow);
      container.appendChild(titlesBody);
}

// Reset Container
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

// Clear container
clearButton.addEventListener("click", () => {
  container.innerHTML = "";
  containerCheck();
})