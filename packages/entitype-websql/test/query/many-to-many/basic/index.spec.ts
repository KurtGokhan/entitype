import { expect } from 'chai';
import { multilineRegExp } from 'test/helper';
import { Context } from './entity/Context';

describe('query > many-to-many > basic', async () => {

  it('should be able to select basic', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.students.include(x => x.courses).select(x => x.name).toList.query;
    expect(loadModelQuery).to
      .match(multilineRegExp([
        /SELECT .* FROM student as t0 /,
        /LEFT JOIN studentscourses as m\d+ ON m\d+.student_id = t0.id /,
        /LEFT JOIN course as t\d+ ON m\d+.course_id = t\d+.id/i
      ], 'i'));
  });
});
