import cheerio from 'cheerio';
import axios from 'axios';

export interface Course {
  title?: string;
  prof?: string;
  url?: string;
}

export function courseListParser(data: string) {
  let ret: Array<Course> = [];
  const $ = cheerio.load(data);
  const courses = $('li.course_label_re');
  courses.each((_, el) => {
    const title = $(el).find('h3').text();
    const prof = $(el).find('p.prof').text();
    const url = $(el).find('a.course_link').attr('href');
    ret.push({
      title: title,
      prof: prof,
      url: url
    });
  });
  return ret;
}

export interface Vodlist {
  title: string;
  vods: Array<string>;
}

export function videoListParser(data: string) {
  let ret: Array<Vodlist> = [];
  const $ = cheerio.load(data);
  for (let i = 0; i < 16; i++) {
    let arr: Array<string> = [];
    const week = $(`div.total_sections li#section-${i} div.content`);
    const name = $(week).find('h3').text();
    const vod = $(week).find('li.modtype_vod a:not(.autolink)');
    if (vod.length === 0) continue;
    vod.each((_, el) => {
      arr.push(el.attribs['href'].replace('view', 'viewer'));
    });
    ret.push({
      title: name,
      vods: arr
    });
  }
  return ret;
}

export async function getPlaylist(url: string) {
  const reg = /file: '(https?:.*?)'/;
  const res = await axios({
    url: url,
    method: 'get',
    withCredentials: true
  });
  const data = res.data.match(reg);
  return data;
}