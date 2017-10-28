import { expect } from 'chai';
import { container } from 'src/ioc';
import * as uc from 'test/config/university-context';
import { mockDriverToReturnDataWithoutAlias } from 'test/mock';

describe('mapping > one-to-many', async () => {
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());

  let course1 = new uc.Course();
  course1.id = 1;
  course1.duration = 3;
  course1.hourSlot = 9;
  course1.weekDay = 0;
  course1.instructor_id = 7;

  let course2 = new uc.Course();
  course2.id = 1;
  course2.duration = 3;
  course2.hourSlot = 13;
  course2.instructor_id = 7;
  course2.weekDay = 1;

  let instructor = new uc.Instructor();
  instructor.id = 7;
  instructor.profile_id = 42;
  instructor.courses = [course1, course2];


  it.skip('should be able to map explicitly joined tables from the owning side', async () => {
    let dataResult = [
      {
        id: instructor.id, profile_id: instructor.profile_id,
        courses: { weekDay: course1.weekDay, instructor_id: course1.instructor_id, duration: course1.duration, hourSlot: course1.hourSlot, id: course1.id }
      },
      {
        id: instructor.id, profile_id: instructor.profile_id,
        courses: { weekDay: course2.weekDay, instructor_id: course2.instructor_id, duration: course2.duration, hourSlot: course2.hourSlot, id: course2.id }
      }
    ];

    mockDriverToReturnDataWithoutAlias(dataResult);

    let ctx = new uc.UniversityContext();
    let result = await ctx.instructors.include(x => x.courses).first();

    expect(result).to.be.eql(instructor);
  });
});