const fs = require("fs");
const axios = require("axios").default;
const { commitReadme, buildReadme } = require("./utils");
axios
  .get(
    "https://admin.whidy.net/api/posts?pagination[page]=1&pagination[pageSize]=5&sort=id:desc&fields[0]=title&fields[1]=updatedAt&fields[2]=slug",
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN_RSS}`,
      },
    }
  )
  .then(({ data }) => {
    const postList = data.data;
    const md = postList
      .map((item, index) => {
        return `- [${item.attributes.title}](https://www.whidy.net/${item.attributes.slug})`;
      })
      .join("\n");
    const readmeData = fs.readFileSync("README.md", "utf8");
    const newReadme = buildReadme(readmeData, `\n${md}\n`);
    if (newReadme !== readmeData) {
      fs.writeFileSync("README.md", newReadme, { encoding: 'utf-8'});
      commitReadme(process.env.GITHUB_TOKEN, ['README.md'])
    }
  });

// const { data } = await axios.post('http://localhost:1337/api/auth/local', {
//   identifier: 'reader@strapi.io',
//   password: 'strapi',
// });
// console.log(data);
// console.log(__dirname);
// const md = data
//   .map((item, index) => {
//     return `- [${item.attributes.title}](${item.attributes.url})`;
//   })
//   .join("\n");
// const readmeData = fs.readFileSync('README_TEST.md', "utf8");
// const newReadme = buildReadme(readmeData, `\n${md}\n`);
// console.log(newReadme);
// fs.writeFileSync(outputFilePath, JSON.stringify(postsArray), { encoding: 'utf-8'});
// const res = fs.writeFileSync("/Users/baishun/webs/whidy/NOTE.md", md, {
//   encoding: "utf-8",
// });

// console.log(res);
