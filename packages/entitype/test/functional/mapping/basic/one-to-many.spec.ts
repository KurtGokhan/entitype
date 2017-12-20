import { expect } from 'chai';
import { container } from 'entitype/src/ioc';
import * as uc from 'entitype/test/config/university-context';
import { mockDriverToReturnDataWithoutAlias } from 'entitype/test/mock';

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
  course2.id = 2;
  course2.duration = 3;
  course2.hourSlot = 13;
  course2.instructor_id = 7;
  course2.weekDay = 1;

  let instructor = new uc.Instructor();
  instructor.id = 7;
  instructor.profile_id = 42;


  it('should be able to map explicitly joined tables from the owning side', async () => {
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
    let result = await ctx.instructors.include(x => x.courses).toList();

    expect(result.length).to.eql(1);

    expect(result[0].id).to.be.eql(instructor.id);
    expect(result[0].profile_id).to.be.eql(instructor.profile_id);
    expect(result[0].courses).to.be.eql([course1, course2]);
  });



  it('should be able to map included child properties from the owning side', async () => {
    let dataResult = [
      {
        id: instructor.id, profile_id: instructor.profile_id,
        courses: { weekDay: course1.weekDay, instructor_id: course1.instructor_id, duration: course1.duration, hourSlot: course1.hourSlot, id: course1.id, instructor: instructor }
      },
      {
        id: instructor.id, profile_id: instructor.profile_id,
        courses: { weekDay: course2.weekDay, instructor_id: course2.instructor_id, duration: course2.duration, hourSlot: course2.hourSlot, id: course2.id, instructor: instructor }
      }
    ];

    mockDriverToReturnDataWithoutAlias(dataResult);

    let ctx = new uc.UniversityContext();
    let result = await ctx.instructors.include(x => x.courses, x => x.instructor).first();

    expect(result.id).to.be.eql(instructor.id);
    expect(result.profile_id).to.be.eql(instructor.profile_id);
    expect(result.courses[0].instructor).to.be.eql(result);
    expect(result.courses[1].instructor).to.be.eql(result);
  });


  it('should return 0 childs if no childs are found', async () => {
    let dataResult = [
      {
        id: instructor.id, profile_id: instructor.profile_id,
        courses: { weekDay: null, instructor_id: null, duration: null, hourSlot: null, id: null }
      }
    ];

    mockDriverToReturnDataWithoutAlias(dataResult);

    let ctx = new uc.UniversityContext();
    let result = await ctx.instructors.include(x => x.courses).toList();

    expect(result.length).to.eql(1);

    expect(result[0].id).to.eql(instructor.id);
    expect(result[0].profile_id).to.eql(instructor.profile_id);
    expect(result[0].courses.length).to.eql(0);
  });


  it('should be able to map childs to another object', async () => {
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
    let result = await ctx.instructors.select(x => x.courses.map(x => ({ time: x.duration, hour: x.hourSlot }))).toList();

    expect(result.length).to.eql(1);
    expect(result[0]).to.eql([{ time: course1.duration, hour: course1.hourSlot }, { time: course2.duration, hour: course2.hourSlot }]);
  });


  it('should be able to map childs to scalar', async () => {
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
    let result = await ctx.instructors.select(x => x.courses.map(x => 5)).toList();

    expect(result.length).to.eql(1);
    expect(result[0]).to.eql([5, 5]);
  });


  it('should be able to map explicitly joined tables from the owned side', async () => {
    let dataResult = [
      {
        instructor: { id: instructor.id, profile_id: instructor.profile_id },
        weekDay: course1.weekDay, instructor_id: course1.instructor_id, duration: course1.duration, hourSlot: course1.hourSlot, id: course1.id
      },
      {
        instructor: { id: instructor.id, profile_id: instructor.profile_id },
        weekDay: course2.weekDay, instructor_id: course2.instructor_id, duration: course2.duration, hourSlot: course2.hourSlot, id: course2.id
      }
    ];

    mockDriverToReturnDataWithoutAlias(dataResult);

    let ctx = new uc.UniversityContext();
    let [resCourse1, resCourse2] = await ctx.courses.include(x => x.instructor).toList();

    expect(resCourse1.duration).to.eql(course1.duration);
    expect(resCourse1.hourSlot).to.eql(course1.hourSlot);
    expect(resCourse1.id).to.eql(course1.id);
    expect(resCourse1.instructor).to.eql(instructor);

    expect(resCourse2.duration).to.eql(course2.duration);
    expect(resCourse2.hourSlot).to.eql(course2.hourSlot);
    expect(resCourse2.id).to.eql(course2.id);
    expect(resCourse2.instructor).to.eql(instructor);
  });
});
