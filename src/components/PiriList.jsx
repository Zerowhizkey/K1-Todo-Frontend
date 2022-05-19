import React from "react";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import dayjs from "dayjs";

function formatTime(timestamp) {
	return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
}

function PiriList(props) {
	return (
		<ul className="ulSection">
			{props.items.map((item) => {
				return (
					<li
						key={item.id}
						className={item.isCompleted ? "done" : "notDone"}
						title={`Created at : ${formatTime(item.createdAt)}${
							item.completedAt
								? `\nCompleted at : ${formatTime(
										item.completedAt
								  )}`
								: ""
						}`}
					>
						{item.text}
						<div className="buttonSection">
							<button
								className="check-button"
								value={item.id}
								onClick={props.checkListItem}
							>
								<BsCheckLg className="check-icon" />
							</button>
							<button
								className="delete-button"
								value={item.id}
								onClick={props.removeListItem}
							>
								<ImCross className="delete-icon" />
							</button>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

export default PiriList;
