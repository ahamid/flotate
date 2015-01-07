var should = require('should'); // https://github.com/shouldjs/should.js#assertions
var fs = require('fs');
var flotate = require('../../src/flotate');

function getFixture(name) {
    return fs.readFileSync(__dirname + '/../fixtures/' + name, 'utf8');
}

describe('flotate', function() {

    describe('translateIncludePath()', function() {

        it('won\'t unnecessarily translate non-.. paths', function() {
            var sourceDir = '/Users/jara/Projects/foo/bar/src';
            var tempDir = '/var/folders/k0/vy40jfp93d538th2y4hkzt7c0000gp/T/flotate1141030-33313-s4izbj/flotate';
            var expectedPath = 'flow-interfaces/lodash.d.ts';
            var actualPath = flotate.translateIncludePath('flow-interfaces/lodash.d.ts', sourceDir, tempDir);
            actualPath.should.equal(expectedPath);
        });

        it('translates ..-relative paths correctly', function() {
            var sourceDir = '/Users/jara/Projects/foo/bar/src';
            var tempDir = '/var/folders/k0/vy40jfp93d538th2y4hkzt7c0000gp/T/flotate1141030-33313-s4izbj/flotate';
            var expectedPath = '../../../../../../../../Users/jara/Projects/foo/bar/contrib/flow-interfaces/lodash.d.ts';
            var actualPath = flotate.translateIncludePath('../contrib/flow-interfaces/lodash.d.ts', sourceDir, tempDir);
            actualPath.should.equal(expectedPath);
        });

    });

    describe('jsToFlow()', function() {
        function itFixture(fixture) {
            it(fixture, function() {
                var input = getFixture(fixture + ".js");
                var expectedOutput = getFixture(fixture + '.ts');
                var actualOutput = flotate.jsToFlow(input);
                actualOutput.should.equal(expectedOutput);
            });
        }

        itFixture('function-argument-types-only');
        itFixture('function-argument-and-return-types');
        itFixture('transform-stability');
        itFixture('return-module-object');
        itFixture('typedefs');
        itFixture('classes');
        itFixture('ignores');
        itFixture('whitespace');

    });

});
