import { AppService } from './app.service';
import { Controller, Get, Query, Req, Post, Body } from '@nestjs/common';

const students = {
  '1': [
    {
      semid: '211',
      subjects: [
        {
          name: 'Mobile development',
          class: 'H1104',
          credits: 3,
          weeks: [43, 44, 45, 46],
        },
        {
          name: 'Computer graphic',
          class: 'H3401',
          credits: 3,
          weeks: [44, 45, 47],
        },
      ],
    },
    {
      semid: '212',
      subjects: [
        {
          name: 'Operating System',
          class: 'H6204',
          credits: 3,
          weeks: [43, 44, 45, 46],
        },
        {
          name: 'Computer network',
          class: 'H6401',
          credits: 3,
          weeks: [41, 42, 44, 45, 47],
        },
      ],
    },
  ],
  '2': [
    {
      semid: '211',
      subjects: [
        {
          name: 'Linear Algebra',
          class: 'H2104',
          credits: 3,
          weeks: [42, 43, 44, 45, 46],
        },
        {
          name: 'Computer Science',
          class: 'H3401',
          credits: 3,
          weeks: [44, 45, 47],
        },
      ],
    },
    {
      semid: '212',
      subjects: [
        {
          name: 'Software development',
          class: 'H6204',
          credits: 3,
          weeks: [43, 44, 45, 46],
        },
        {
          name: 'Computer network',
          class: 'H6401',
          credits: 3,
          weeks: [41, 42, 44, 45, 47],
        },
      ],
    },
  ],
};

@Controller('students')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('semester?')
  getSemester(
    @Query('sid') sid: string,
    @Query('semid') semid: string,
  ): string {
    const semesters = students[sid];
    console.log(semesters);
    for (const semester of semesters) {
      console.log(semester['semid']);
      if (semester['semid'] == semid) {
        return semester['subjects'];
      }
    }
    return 'Khong tim thay thong tin phu hop';
  }

  @Post('semester')
  create(@Body() semester: string) {
    if (!semester.hasOwnProperty('sid')) {
      return 'Hoc ky yeu cau ma so sinh vien';
    }
    if (!semester.hasOwnProperty('semid')) {
      return 'Hoc ky yeu cau co khoa "semid"';
    }
    if (!semester.hasOwnProperty('subjects')) {
      return 'Hoc ky yeu cau co khoa "subjects"';
    }
    if (!this.isNumber(semester['semid'])) {
      return 'Ma so hoc ky yeu cau la so';
    }
    if (students[semester['sid']]) {
      students[semester['sid']].push({
        semid: semester['semid'],
        subjects: semester['subjects'],
      });
      console.log(students[semester['sid']]);
      return 'Them hoc ky cho sinh vien thanh cong';
    }
    return 'Khong tim thay ma so sinh vien';
  }

  isNumber(numStr: string) {
    return !isNaN(parseFloat(numStr)) && !isNaN(+numStr);
  }
}
