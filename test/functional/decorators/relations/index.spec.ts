
import { expect } from 'chai';
import { DecoratorStorage } from 'src/storage/DecoratorStorage';

import * as university from './university-context';

describe('decorators > relations', async () => {
  it('should create and store many-to-many columns', () => {
    let student = DecoratorStorage.getEntity(university.Student);
    let course = DecoratorStorage.getEntity(university.Course);
    let map = DecoratorStorage.getEntity(university.StudentCourseMap);

    let studentCourses = student.columns.find(x => x.name === 'courses');
    let courseStudents = course.columns.find(x => x.name === 'students');

    // TODO: Assert that the foreign key is created on the map side

    expect(studentCourses.isArray).to.be.true;
    expect(studentCourses.isNavigationProperty).to.be.true;
    expect(studentCourses.isColumn).to.be.false;
    expect(studentCourses.manyToManyMapping.leftKey).to.be.eql('student_id');
    expect(studentCourses.manyToManyMapping.rightKey).to.be.eql('course_id');
    expect(studentCourses.manyToManyMapping.owner).to.be.equal(map);
    expect(studentCourses.type).to.be.equal(university.Course);


    expect(courseStudents.isArray).to.be.true;
    expect(courseStudents.isNavigationProperty).to.be.true;
    expect(courseStudents.isColumn).to.be.false;
    expect(courseStudents.manyToManyMapping.leftKey).to.be.eql('course_id');
    expect(courseStudents.manyToManyMapping.rightKey).to.be.eql('student_id');
    expect(courseStudents.manyToManyMapping.owner).to.be.equal(map);
    expect(courseStudents.type).to.be.equal(university.Student);
  });

  it('should create and store one-to-many and many-to-one columns', () => {
    let instructor = DecoratorStorage.getEntity(university.Instructor);
    let course = DecoratorStorage.getEntity(university.Course);

    let instructorCourses = instructor.columns.find(x => x.name === 'courses');
    let courseInstructor = course.columns.find(x => x.name === 'instructor');


    expect(instructorCourses.isArray).to.be.true;
    expect(instructorCourses.isNavigationProperty).to.be.true;
    expect(instructorCourses.isColumn).to.be.false;
    expect(instructorCourses.type).to.be.equal(university.Course);
    expect(instructorCourses.foreignKey.column).to.be.eql('instructor_id');
    expect(instructorCourses.foreignKey.owner.type).to.be.eql(university.Course);


    expect(courseInstructor.isArray).to.be.false;
    expect(courseInstructor.isNavigationProperty).to.be.true;
    expect(courseInstructor.isColumn).to.be.false;
    expect(courseInstructor.type).to.be.equal(university.Instructor);
    expect(courseInstructor.foreignKey.column).to.be.eql('instructor_id');
    expect(courseInstructor.foreignKey.owner.type).to.be.eql(university.Course);
  });
});
