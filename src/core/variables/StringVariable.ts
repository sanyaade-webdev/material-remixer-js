/** @license
 *  Copyright 2016 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import { ISerializableData } from "../../lib/LocalStorage";
import { IVariableCallback, IVariableListParams, Variable } from "./Variable";
import { VariableType } from "../../lib/Constants";

/**
 * Interface for a class that represents a type of Variable for string values.
 * @interface
 * @extends IVariableListParams
 */
interface IStringVariableParams extends IVariableListParams {
  defaultValue: string;
  selectedValue: string;
  possibleValues?: string[];
}

/**
 * A class representing a type of Variable for string values.
 * @class
 * @extends Variable
 * @implements {IStringVariableParams}
 */
export class StringVariable extends Variable implements IStringVariableParams {

  /**
   * Creates an instance of a StringVariable.
   * @constructor
   * @param  {string}            key            [A unique key for the Variable.
   * @param  {string}            defaultValue   The default value.
   * @param  {string[]}          possibleValues The array of possible values.
   * @param  {IVariableCallback} callback       The callback to invoke when updated.
   * @return {StringVariable}
   */
  constructor(
    key: string,
    defaultValue: string,
    possibleValues?: string[],
    callback?: IVariableCallback,
  ) {
    super(key, VariableType.STRING, defaultValue, callback);
    this.possibleValues = possibleValues ? possibleValues : [];
  }

  /**
   * Clones the variable.
   * @return {StringVariable} Returns the cloned variable.
   */
  clone() {
    let cloned = new StringVariable(
      this.key,
      this.defaultValue,
      this.possibleValues,
    );
    cloned.title = this.title;
    cloned._callbacks = this._callbacks.slice();
    return cloned;
  }

  /**
   * The array of possible values for this Variable.
   * @override
   * @type {string[]}
   */
  possibleValues?: string[];

  /**
   * Returns a serialized representation of this object.
   * @override
   * @return {ISerializableData} The serialized data.
   */
  serialize(): ISerializableData {
    let data = super.serialize();
    data.selectedValue = this.selectedValue;
    data.possibleValues = this.possibleValues;
    return data;
  }

  /**
   * Returns a new initialized StringVariable from serialized data.
   * @override
   * @param  {ISerializableData} data The serialized data.
   * @return {StringVariable}         A new initialized StringVariable.
   */
  static deserialize(data: ISerializableData): StringVariable {
    return new StringVariable(
      data.key,
      data.selectedValue,
      data.possibleValues,
    );
  }
}
