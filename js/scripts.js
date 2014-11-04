var draggedItem = null;
var storage1 = null;
var storage2 = null;
var reference = null;

function dragStart(ev) {
	this.style.opacity = '0.4';
	draggedItem = this;
	ev.dataTransfer.effectAllowed = 'move';
	ev.dataTransfer.setData('text/html', this.innerHTML);
}

function dragEnter(ev) {
	return false;
}

function dragOver(ev) {
	ev.preventDefault();
	ev.dataTransfer.dropEffect = 'move';
	return false;
}

function dragDrop(ev) {
	ev.stopPropagation();

	var divMoved = this;

	function dragDirection() {
		var countA = countNextSiblings(divMoved);
		var countB = countNextSiblings(draggedItem);

		if(countA > countB) {
			upDirection(countA - countB);
		} else {
			downDirection(countB - countA);
		}
	};

	function countNextSiblings(node) {
		var holder = node;
		var count = 0;

		while(holder.nextElementSibling) {
			count += 1;
			holder = holder.nextElementSibling;
		}
		return count;
	};

	dragDirection();

	function upDirection(count) {
		storage1 = divMoved.innerHTML;
		divMoved.innerHTML = ev.dataTransfer.getData('text/html');

		var counter = 0;
		reference = divMoved.nextElementSibling;
		while(counter < count) {
			storage2 = storage1;
			storage1 = reference.innerHTML;
			reference.innerHTML = storage2;
			reference = reference.nextElementSibling;
			counter++;
		}
	};

	function downDirection(count) {
		storage1 = divMoved.innerHTML;
		divMoved.innerHTML = ev.dataTransfer.getData('text/html');

		var counter = 0;
		reference = divMoved.previousElementSibling;
		while(counter < count) {
			storage2 = storage1;
			storage1 = reference.innerHTML;
			reference.innerHTML = storage2;
			reference = reference.previousElementSibling;
			counter++;
		}
	};

	return false;
}

function dragLeave(ev) {
	return false;
}

function dragEnd(ev) {
	this.style.opacity = '1.0';
}

var div = document.querySelectorAll('.tag');
[].forEach.call(div, function(each_div) {
	each_div.addEventListener('dragstart', dragStart, false);
	each_div.addEventListener('dragover', dragOver, false);
	each_div.addEventListener('drop', dragDrop, false);
	each_div.addEventListener('dragenter', dragEnter, false);
	each_div.addEventListener('dragleave', dragLeave, false);
	each_div.addEventListener('dragend', dragEnd, false);
});