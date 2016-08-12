var obj = [
    ["Path", {
        "applyMatrix": true,
        "segments": [
            [806.24, 393.95],
            [1214.42, 393.95]
        ],
        "strokeColor": [0.15686, 0.15686, 0.15686],
        "strokeWidth": 2
    }],
    ["Path", {
        "applyMatrix": true,
        "segments": [
            [1214.42, 393.95],
            [1214.42, -3.03]
        ],
        "strokeColor": [0.15686, 0.15686, 0.15686],
        "strokeWidth": 2
    }],
    ["Path", {
        "applyMatrix": true,
        "segments": [
            [806.24, 393.95],
            [510.84, 393.95]
        ],
        "strokeColor": [0.15686, 0.15686, 0.15686],
        "strokeWidth": 2
    }],
    ["Path", {
        "applyMatrix": true,
        "segments": [
            [806.24, -3.03],
            [1214.42, -3.03]
        ],
        "strokeColor": [0.15686, 0.15686, 0.15686],
        "strokeWidth": 2
    }],
    ["Path", {
        "applyMatrix": true,
        "segments": [
            [806.24, -3.03],
            [510.84, -3.03]
        ],
        "strokeColor": [0.15686, 0.15686, 0.15686],
        "strokeWidth": 2
    }],
    ["Path", {
        "applyMatrix": true,
        "segments": [
            [510.84, -3.03],
            [510.84, 393.95]
        ],
        "strokeColor": [0.15686, 0.15686, 0.15686],
        "strokeWidth": 2
    }],
    ["Path", {
        "applyMatrix": true,
        "segments": [
            [806.24, 393.95],
            [806.24, -3.03]
        ],
        "strokeColor": [0.15686, 0.15686, 0.15686],
        "strokeWidth": 2
    }]
];

paper.view.center = new Point(1000, 200);

var findMidle = function(x1,y1,x2,y2){

    return {X:((x1+x2)/2),Y:((y1+y2)/2)};

};

var wall_segments = [];


for (var i = 0; i < obj.length; i++) {
    var path = new Path(obj[i][1]);

    var x1 = obj[i][1].segments[0][0];
    var y1 = obj[i][1].segments[0][1];
    var x2 = obj[i][1].segments[1][0];
    var y2 = obj[i][1].segments[1][1];

    var middle = findMidle(x1,y1,x2,y2);

    wall_segments.push({ X: x1, Y: y1, path: path, middle:middle});
    wall_segments.push({ X: x2, Y: y2 , path: path, middle:middle});

    var startPoint = new Path.Circle({
        center: obj[i][1].segments[0],
        radius: 30,
        strokeColor: 'black'
    });

    var endPoint = new Path.Circle({
        center: obj[i][1].segments[1],
        radius: 20,
        strokeColor: 'red'
    }); 

     var middlePont = new Path.Circle({
        center: [middle.X,middle.Y],
        radius: 10,
        fillColor: 'red'
    }); 
}



for (var i = 0; i < wall_segments.length; i++) {
  
    var inside = insidePoly(wall_segments, wall_segments[i].middle);
    if (inside) {
        wall_segments[i].path.strokeWidth = 10;
        console.log(wall_segments[i]);
    }
}


function insidePoly(polygon, testPoint) {
    var result = false;

    for (var i = 0, j = polygon.length - 1; i < polygon.length; i++) {

        if (polygon[i].Y < testPoint.Y && polygon[j].Y >= testPoint.Y || polygon[j].Y < testPoint.Y && polygon[i].Y >= testPoint.Y) {
            if (polygon[i].X + (testPoint.Y - polygon[i].Y) / (polygon[j].Y - polygon[i].Y) * (polygon[j].X - polygon[i].X) < testPoint.X) {
                result = !result;
            }
        }
        j = i;
    }
    return result;
}


