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

import { Constants as CONST } from "../../lib/Constants";
import { SerializableData } from "../../lib/LocalStorage";
import { Variable, VariableType, VariableCallback } from "./Variable";

/**
 * Interface for a class that represents a type of Variable for boolean values.
 * @interface
 * @extends VariableType
 */
interface BooleanVariableType extends VariableType {
  defaultValue: boolean;
  selectedValue: boolean;
}

/**
 * A class representing a type of Variable for boolean values.
 * @class
 * @extends Variable
 * @implements {BooleanVariableType}
 */
export class BooleanVariable extends Variable implements BooleanVariableType {

  /**
   * Creates an instance of a BooleanVariable.
   * @constructor
   * @param  {string}           key          A unique key for the Variable.
   * @param  {boolean}          defaultValue The default value.
   * @param  {VariableCallback} callback     The callback method to be invoked
   *                                         when the Variable is updated.
   * @return {BooleanVariable}
   */
  constructor(key: string, defaultValue: boolean, callback?: VariableCallback) {
    super(key, CONST.VARIABLE_TYPE_BOOLEAN, defaultValue, callback);
  }

  /**
   * Returns a serialized representation of this object.
   * @override
   * @return {SerializableData} The serialized data.
   */
  serialize(): SerializableData {
    let data = super.serialize();
    data.defaultValue = this.defaultValue ? "true" : "false";
    data.selectedValue = this.selectedValue ? "true" : "false";
    return data;
  }

  /**
   * Returns a new initialized BooleanVariable from serialized data.
   * @override
   * @param  {SerializableData} data The serialized data.
   * @return {BooleanVariable}       A new initialized BooleanVariable.
   */
  static deserialize(data: SerializableData): BooleanVariable {
    let selectedValue: boolean = (data.selectedValue === "true");
    return new BooleanVariable(data.key, selectedValue);
  }
}
