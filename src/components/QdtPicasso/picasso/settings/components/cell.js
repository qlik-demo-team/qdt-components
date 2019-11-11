const cell = () => { 
    return {
        key: 'cell',
        type: 'box',
        displayOrder: 3,
        data: {
            collection: 'stacked',
        },
        settings: {
            major: {
                ref: 'series',
                binStart: {
                    scale: 'm',
                    fn: b => {
                        let ss = b.resources.scale('b');
                        return b.resources.scale('m')(ss.datum(b.datum.series.value).start.value);
                    },
                },
                binEnd: {
                    fn: b => {
                        let ss = b.resources.scale('b');
                        return b.resources.scale('m')(ss.datum(b.datum.series.value).end.value);
                    }
                }
            },
            minor: { scale: 'y', ref: 'end' },
            box: {
                fill: {
                    scale: 'c',
                },
                opacity: 1,
                strokeWidth: 1,
                stroke: '#fff'

            },
        }

    }
}

export default cell;
