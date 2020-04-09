import cheerio from 'cheerio';

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

export function videoListParser(data: string) {
  let ret: Array<string> = [];
  return ret;
}