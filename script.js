let categorySelect = document.getElementById('category');

async function getArticles() {

    let url = 'https://api.publicapis.org/categories';
    let response = await fetch(url).catch(error => alert(error));

    let result = await response.json();

    for (let category of result.categories) {
        let categoryOption = document.createElement('option');
        categoryOption.value = category;
        categoryOption.innerText = category;
        categorySelect.appendChild(categoryOption);
    };

    categorySelect.addEventListener('change', async () => {

        let categoryUrl = `https://api.publicapis.org/entries?category=${categorySelect.value}`;
        let titleSelect = document.getElementById('title');

        titleSelect.innerHTML = '';

        let titleResponse = await fetch(categoryUrl).catch(error => alert(error));
        let titleResult = await titleResponse.json();

        for (let title of titleResult.entries) {
            let titleOption = document.createElement('option');
            titleOption.value = title.API;
            titleOption.innerText = title.API;
            titleSelect.appendChild(titleOption);
        }

        getArticleInfo();

        titleSelect.addEventListener('change', getArticleInfo);

        async function getArticleInfo() {
            let articleUrl = `https://api.publicapis.org/entries?title=${titleSelect.value}`;

            let article = await fetch(articleUrl).catch(error => alert(error));
            let articleResult = await article.json();
            console.log(articleResult);

            let h2 = document.createElement('h2');
            h2.innerText = `Title: ${articleResult.entries[0].API}`;
            document.body.appendChild(h2);

            let p = document.createElement('p');
            p.innerText = `Description: ${articleResult.entries[0].Description}`;
            document.body.appendChild(p);

            let a = document.createElement('a');
            a.innerText = articleResult.entries[0].Link;
            a.href = articleResult.entries[0].Link;
            document.body.appendChild(a);
        }
    });
}

getArticles().catch(error => alert(error.message));