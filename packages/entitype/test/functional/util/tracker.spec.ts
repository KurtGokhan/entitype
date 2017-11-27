import { expect } from 'chai';
import { Tracker } from 'src/query/Tracker';
import * as university from 'test/config/university-context';

describe('util > tracker', async () => {
  it('should be able to track deep objects', async () => {
    let tracker = new Tracker();

    let course1 = new university.Course();
    course1.id = 6;
    course1.duration = 100;
    course1.hourSlot = 3;

    let course2 = new university.Course();
    course1.id = 6;
    course1.duration = 5;
    course1.hourSlot = 4;

    let course3 = new university.Course();
    course1.id = 7;
    course1.duration = 5;
    course1.hourSlot = 7;

    tracker.setTrackedValue(university.Course, [course1.id, course1.duration], course1);
    tracker.setTrackedValue(university.Course, [course2.id, course2.duration], course2);
    tracker.setTrackedValue(university.Course, [course3.id, course3.duration], course3);

    let tCourse1 = tracker.getTrackedValue(university.Course, [course1.id, course1.duration]);
    let tCourse2 = tracker.getTrackedValue(university.Course, [course2.id, course2.duration]);
    let tCourse3 = tracker.getTrackedValue(university.Course, [course3.id, course3.duration]);

    expect(tCourse1).to.eql(course1);
    expect(tCourse2).to.eql(course2);
    expect(tCourse3).to.eql(course3);
  });
});
