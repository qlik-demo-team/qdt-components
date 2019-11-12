const column = function column() {
  const comp = {
        key: 'bar-labels',
        //displayOrder: 4,
        type: 'box',
        dock: 'top',
        preferredSize: () => 24,
        data: {
            collection: 'span'
        },
        settings: {
            major: {
                binStart: {
                    scale: opts.scale,
                    fn: b => {
                        let ss = b.resources.scale('b');
                        return b.resources.scale('m')(ss.datum(b.datum.value).start.value);
                    },
                },
                binEnd: {
                    fn: b => {
                        let ss = b.resources.scale('b');
                        return b.resources.scale('m')(ss.datum(b.datum.value).end.value);
                    }
                }
            },
            minor: { start: 0, end: 1 },
            box: {
                fill: 'rgba(100, 0, 0, 0.0)'
            }
        }
    }
    return comp
}

export default column;

