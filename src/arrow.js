import { createSVG } from './svg_utils';

export default class Arrow {
    constructor(gantt, from_task, to_task, relationship_type) {
        this.gantt = gantt;
        this.from_task = from_task;
        this.to_task = to_task;
        this.relationship_type = relationship_type;

        this.calculate_path();
        this.draw();
    }

    calculate_path() {
        let start_x =
            this.from_task.$bar.getX() + this.from_task.$bar.getWidth();
        if (this.relationship_type === 'SS') {
            start_x = this.from_task.$bar.getX();
        }

        // const condition = () =>
        //     this.to_task.$bar.getX() < start_x + this.gantt.options.padding &&
        //     start_x > this.from_task.$bar.getX() + this.gantt.options.padding;

        // while (condition()) {
        //     start_x -= 10;
        // }

        const start_y =
            this.gantt.options.header_height +
            this.gantt.options.bar_height +
            (this.gantt.options.padding + this.gantt.options.bar_height) *
            this.from_task.task._index +
            this.gantt.options.padding -
            this.from_task.$bar.getHeight() / 2;

        let end_x = this.to_task.$bar.getX() - this.gantt.options.padding / 2;
        if (this.relationship_type === 'FF') {
            end_x = this.to_task.$bar.getX() + this.to_task.$bar.getWidth();
        }

        const end_y =
            this.gantt.options.header_height +
            this.gantt.options.bar_height / 2 +
            (this.gantt.options.padding + this.gantt.options.bar_height) *
            this.to_task.task._index +
            this.gantt.options.padding;

        const arrow_padding = 8;
        const from_is_below_to = start_y > end_y;
        const curve = this.gantt.options.arrow_curve;
        const clockwise = from_is_below_to ? 1 : 0;
        const curve_y = from_is_below_to ? -curve : curve;
        const offset = from_is_below_to
            ? end_y + this.gantt.options.arrow_curve
            : end_y - this.gantt.options.arrow_curve;

        if (this.relationship_type === 'FS') {
            this.lines = [
                createSVG('line', {
                    x1: start_x,
                    y1: start_y,
                    x2: start_x + arrow_padding,
                    y2: start_y,
                }),
                createSVG('line', {
                    x1: start_x + arrow_padding,
                    y1: start_y,
                    x2: start_x + arrow_padding,
                    y2: end_y,
                }),
                createSVG('line', {
                    x1: start_x + arrow_padding,
                    y1: end_y,
                    x2: end_x,
                    y2: end_y,
                }),
                createSVG('line', {
                    x1: end_x,
                    y1: end_y,
                    x2: end_x - 4,
                    y2: end_y + 4,
                }),
                createSVG('line', {
                    x1: end_x,
                    y1: end_y,
                    x2: end_x - 4,
                    y2: end_y - 4,
                }),
            ];
            if (
                // конец родительского бара >= начало дочернего
                this.from_task.$bar.getX() +
                this.from_task.$bar.getWidth() +
                this.gantt.options.padding >
                this.to_task.$bar.getX()
            ) {
                if (from_is_below_to) {
                    this.lines = [
                        createSVG('line', {
                            x1: start_x,
                            y1: start_y,
                            x2: start_x + arrow_padding,
                            y2: start_y,
                        }),
                        createSVG('line', {
                            x1: start_x + arrow_padding,
                            y1: start_y,
                            x2: start_x + arrow_padding,
                            y2: end_y + this.gantt.options.padding,
                        }),
                        createSVG('line', {
                            x1: start_x + arrow_padding,
                            y1: end_y + this.gantt.options.padding,
                            x2: end_x - arrow_padding,
                            y2: end_y + this.gantt.options.padding,
                        }),
                        createSVG('line', {
                            x1: end_x - arrow_padding,
                            y1: end_y + this.gantt.options.padding,
                            x2: end_x - arrow_padding,
                            y2: end_y,
                        }),
                        createSVG('line', {
                            x1: end_x - arrow_padding,
                            y1: end_y,
                            x2: end_x,
                            y2: end_y,
                        }),
                        createSVG('line', {
                            x1: end_x,
                            y1: end_y,
                            x2: end_x - 4,
                            y2: end_y + 4,
                        }),
                        createSVG('line', {
                            x1: end_x,
                            y1: end_y,
                            x2: end_x - 4,
                            y2: end_y - 4,
                        }),
                    ];
                } else {
                    this.lines = [
                        createSVG('line', {
                            x1: start_x,
                            y1: start_y,
                            x2: start_x + arrow_padding,
                            y2: start_y,
                        }),
                        createSVG('line', {
                            x1: start_x + arrow_padding,
                            y1: start_y,
                            x2: start_x + arrow_padding,
                            y2: end_y - this.gantt.options.padding,
                        }),
                        createSVG('line', {
                            x1: start_x + arrow_padding,
                            y1: end_y - this.gantt.options.padding,
                            x2: end_x - arrow_padding,
                            y2: end_y - this.gantt.options.padding,
                        }),
                        createSVG('line', {
                            x1: end_x - arrow_padding,
                            y1: end_y - this.gantt.options.padding,
                            x2: end_x - arrow_padding,
                            y2: end_y,
                        }),
                        createSVG('line', {
                            x1: end_x - arrow_padding,
                            y1: end_y,
                            x2: end_x,
                            y2: end_y,
                        }),
                        createSVG('line', {
                            x1: end_x,
                            y1: end_y,
                            x2: end_x - 4,
                            y2: end_y + 4,
                        }),
                        createSVG('line', {
                            x1: end_x,
                            y1: end_y,
                            x2: end_x - 4,
                            y2: end_y - 4,
                        }),
                    ];
                }
            }
        }

        if (this.relationship_type === 'SS') {
            this.path = `
            M ${start_x} ${start_y}
            a ${curve} ${curve} 0 0 0 -${curve}  ${curve}
            V ${offset}
            a ${curve} ${curve} 0 0 ${clockwise} ${curve} ${curve_y}
            L ${end_x} ${end_y}
            m -4 -4
            l 4 4
            l -4 4`;
            if (from_is_below_to) {
                this.path = `
            M ${start_x} ${start_y}
            a ${curve} ${curve} 0 0 1 -${curve} -${curve}
            V ${offset}
            a ${curve} ${curve} 0 0 ${clockwise} ${curve} ${curve_y}
            L ${end_x} ${end_y}
                m -4 -4
                l 4 4
                l -4 4`;
            }

            if (
                this.to_task.$bar.getX() <
                this.from_task.$bar.getX() + this.gantt.options.padding - 20
            ) {
                const down_1 = from_is_below_to
                    ? -this.gantt.options.padding + 2 * curve
                    : this.gantt.options.padding - curve;
                const down_2 =
                    this.to_task.$bar.getY() +
                    this.to_task.$bar.getHeight() / 2 -
                    curve_y;
                const left =
                    this.to_task.$bar.getX() - this.gantt.options.padding;

                this.path = `
                M ${start_x} ${start_y}
                a ${curve} ${curve} 0 0 0 -${curve}  ${curve}
                v ${down_1}
                a ${curve} ${curve} 0 0 1 -${curve} ${curve}
                H ${left}
                a ${curve} ${curve} 0 0 ${clockwise} -${curve} ${curve_y}
                V ${down_2}
                a ${curve} ${curve} 0 0 ${clockwise} ${curve} ${curve_y}
                L ${end_x} ${end_y}
                m -4 -4
                l 4 4
                l -4 4`;
                if (from_is_below_to) {
                    this.path = `
                M ${start_x} ${start_y}
                a ${curve} ${curve} 0 0 1 -${curve} -${curve}
                v ${down_1}
                a ${curve} ${curve} 0 0 0 -${curve} -${curve}
                H ${left}
                a ${curve} ${curve} 0 0 ${clockwise} -${curve} ${curve_y}
                V ${down_2}
                a ${curve} ${curve} 0 0 ${clockwise} ${curve} ${curve_y}
                L ${end_x} ${end_y}
                m -4 -4
                l 4 4
                l -4 4`;
                }
            }
        }

        if (this.relationship_type === 'FF') {
            const down_1 = from_is_below_to
                ? -this.gantt.options.padding + 2 * curve
                : this.gantt.options.padding - curve;
            const down_2 =
                this.to_task.$bar.getY() +
                this.to_task.$bar.getHeight() / 2 -
                curve_y;
            let right =
                this.to_task.$bar.getX() +
                this.to_task.$bar.getWidth() +
                this.gantt.options.padding / 2;

            this.path = `
                        M ${start_x} ${start_y}
                        h 4
                        a ${curve} ${curve} 0 0 1 ${curve} ${curve}
                        v ${down_1}
                        a ${curve} ${curve} 0 0 1 -${curve} ${curve}
                        H ${right + 5}
                        a ${curve} ${curve} 0 0 ${clockwise} -${curve} ${curve_y}
                        V ${down_2}
                        a ${curve} ${curve} 0 0 1 -${curve} ${curve_y}
                        L ${end_x} ${end_y}
                        m 4 -4
                        l -4 4
                        l 4 4`;
            if (from_is_below_to) {
                this.path = `
                        M ${start_x} ${start_y}
                        h 4
                        a ${curve} ${curve} 0 0 0 ${curve} -${curve}
                        v ${down_1}
                        a ${curve} ${curve} 0 0 0 -${curve} -${curve}
                        H ${right + 5}
                        a ${curve} ${curve} 0 0 ${clockwise} -${curve} ${curve_y}
                        V ${down_2}
                        a ${curve} ${curve} 0 0 0 -${curve} ${curve_y}
                        L ${end_x} ${end_y}
                        m 4 -4
                        l -4 4
                        l 4 4`;
            }

            if (
                this.to_task.$bar.getX() + this.to_task.$bar.getWidth() >
                this.from_task.$bar.getX() + this.from_task.$bar.getWidth()
            ) {
                this.path = `
                        M ${start_x} ${start_y}
                        h 4
                        a ${curve} ${curve} 0 0 1 ${curve} ${curve}
                        v ${down_1}
                        a ${curve} ${curve} 0 0 0 ${curve} ${curve}
                        H ${right - 5}
                        a ${curve} ${curve} 0 0 1 ${curve} ${curve_y}
                        V ${down_2}
                        a ${curve} ${curve} 0 0 1 -${curve} ${curve_y}
                        L ${end_x} ${end_y}
                        m 4 -4
                        l -4 4
                        l 4 4`;
                if (from_is_below_to) {
                    this.path = `
                        M ${start_x} ${start_y}
                        h 4
                        a ${curve} ${curve} 0 0 0 ${curve} -${curve}
                        v ${down_1}
                        a ${curve} ${curve} 0 0 1 ${curve} -${curve}
                        H ${right - 5}
                        a ${curve} ${curve} 0 0 0 ${curve} ${curve_y}
                        V ${down_2}
                        a ${curve} ${curve} 0 0 0 -${curve} ${curve_y}
                        L ${end_x} ${end_y}
                        m 4 -4
                        l -4 4
                        l 4 4`;
                }
            }

            if (
                Math.abs(
                    this.to_task.$bar.getX() +
                    this.to_task.$bar.getWidth() -
                    (this.from_task.$bar.getX() +
                        this.from_task.$bar.getWidth())
                ) < 9
            ) {
                right = start_x > end_x ? start_x + 5 : end_x + 5;
                this.path = `
                        M ${start_x} ${start_y}
                        H ${right - 1}
                        a ${curve} ${curve} 0 0 1 ${curve} ${curve}
                        V ${down_2}
                        a ${curve} ${curve} 0 0 1 -${curve} ${curve_y}
                        L ${end_x} ${end_y}
                        m 4 -4
                        l -4 4
                        l 4 4`;
                if (from_is_below_to) {
                    this.path = `
                        M ${start_x} ${start_y}
                        H ${right - 1}
                        a ${curve} ${curve} 0 0 0 ${curve} -${curve}
                        V ${down_2}
                        a ${curve} ${curve} 0 0 0 -${curve} ${curve_y}
                        L ${end_x} ${end_y}
                        m 4 -4
                        l -4 4
                        l 4 4`;
                }
            }
        }

        this.lines.forEach((line) => {
            line.addEventListener('mouseover', () => {
                line.parentNode.classList.add('hover');
            });
            line.addEventListener('click', () => {
                const parent_bar = line.parentNode.dataset.from;
                console.log(this);
                const index_of_task =
                    this.to_task.task.dependencies.indexOf(parent_bar);
                console.log(index_of_task);
                this.to_task.task.dependencies.splice(index_of_task, 1);
                this.to_task.task.relationship_options.type.splice(
                    index_of_task,
                    1
                );
                this.to_task.task.relationship_options.hard.splice(
                    index_of_task,
                    1
                );
                this.to_task.task.relationship_options.asap.splice(
                    index_of_task,
                    1
                );
                this.to_task.task.relationship_options.delay.splice(
                    index_of_task,
                    1
                );
                console.log('arrow deleted');
            });
        });
        this.lines.forEach((line) => {
            line.addEventListener('mouseleave', () => {
                line.parentNode.classList.remove('hover');
            });
        });
    }

    draw() {
        this.element = createSVG('g', {
            'data-from': this.from_task.task.id,
            'data-to': this.to_task.task.id,
        });
        this.lines.forEach((line) => {
            this.element.appendChild(line);
        });
    }

    update() {
        this.calculate_path();
        this.element.innerHTML = '';
        this.lines.forEach((line) => {
            this.element.appendChild(line);
        });
    }
}
