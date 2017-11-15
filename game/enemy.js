var Enemy = function(name, color, position, direction) {
    
        this.name = name;
        this.position = position;
        this.life = 3;
        this.direction = direction;
        this.speed = 0;
    
        this.material = new THREE.MeshLambertMaterial({
            color: color,
            });
    
        bumperMesh = new THREE.Mesh(new THREE.CylinderGeometry(0, 10, 10, 12, 12, false), this.materialBumper);
        bumperMesh.rotation.x = Math.PI / 2 ;
    
        sphere = new THREE.SphereGeometry(6, 8, 8);
        THREE.GeometryUtils.merge(sphere, bumperMesh);
    
        canon = new THREE.CubeGeometry(3, 3, 15);
        THREE.GeometryUtils.merge(canon, sphere);
    
        this.graphic = new THREE.Mesh(sphere, this.material);
        this.graphic.position.z = 50;
        this.graphic.position.x = 50;
        this.graphic.position.y = 50;
        this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction);
    };
    
    Enemy.prototype.accelerate = function (distance) {
        var max = 2;
    
        this.speed += distance / 4;
        if (this.speed >= max) {
            this.speed = max;
        }
    };
    
    Enemy.prototype.dead = function () {
        this.graphic.position.z = this.graphic.position.z-0.1;
            //Nettoyage de la div container
            $("#container").html("");
            jQuery('#'+this.name+' >.life').text("Tu es mort !");
            init();
    }
    
    Enemy.prototype.decelerate = function (distance) {
        var min = -1;
    
        this.speed -= distance / 16;
        if (this.speed <= min) {
            this.speed = min;
        }
    };
    
    Enemy.prototype.displayInfo = function () {
        jQuery('#'+this.name+' >.life').text(this.life);
    }
    
    Enemy.prototype.turnRight = function (angle) {
        this.direction -= angle;
        this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), -angle);
    };
    
    Enemy.prototype.turnLeft = function (angle) {
        this.direction += angle;
        this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), angle);
    };
    
    Enemy.prototype.move = function () {
        var moveTo = new THREE.Vector3(
            this.speed * Math.cos(this.direction) + this.graphic.position.x,
            this.speed * Math.sin(this.direction) + this.graphic.position.y,
            this.graphic.position.z
        );
    
        this.graphic.position = moveTo;
        if (this.speed > 0) {
            this.speed = this.speed - 0.04;
        }
        else if (this.speed < 0) {
            this.speed = this.speed + 0.04
        }
    
        light1.position.x = this.graphic.position.x;
        light1.position.y = this.graphic.position.y;
       // light1.position.z = this.graphic.position.z + 500;
    };
    