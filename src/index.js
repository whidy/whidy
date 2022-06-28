const fs = require("fs");
// const path = require("path");
// const axios = require("axios").default;
const { data } = require("./api-result.json");
const core = require("@actions/core");
const {
  updateAndParseCompoundParams,
  commitReadme,
  truncateString,
  buildReadme,
  exec,
  getParameterisedTemplate,
  escapeHTML,
} = require("./utils");
// const { data } = await axios.post('http://localhost:1337/api/auth/local', {
//   identifier: 'reader@strapi.io',
//   password: 'strapi',
// });
// console.log(data);
console.log(__dirname);
const md = data
  .map((item, index) => {
    return `- [${item.attributes.title}](${item.attributes.url})`;
  })
  .join("\n");
const readmeData = fs.readFileSync(path.resolve(__dirname, 'README_TEST.md'), "utf8");
console.log(readmeData);
const newReadme = buildReadme(readmeData, `\n${md}\n`);
console.log(newReadme);
// fs.writeFileSync(outputFilePath, JSON.stringify(postsArray), { encoding: 'utf-8'});
// const res = fs.writeFileSync("/Users/baishun/webs/whidy/NOTE.md", md, {
//   encoding: "utf-8",
// });

// console.log(res);
// axios.get('https://admin.whidy.net/api/posts?pagination[page]=1&pagination[pageSize]=5&sort=id:desc&fields[0]=title&fields[1]=updatedAt&fields[2]=slug', {
//   headers: {
//     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU2MzkyNzIyLCJleHAiOjE2NTg5ODQ3MjJ9.fcceMhBQBib6PZOEg9PRlUZI8vIXj_akNViLVyPjcgM"
//   }
// }).then(res => {
//   console.log(res)
// })
